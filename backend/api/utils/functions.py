import functools
import json
import os
import re
from base64 import b64encode
from calendar import timegm
from datetime import datetime
from functools import wraps
from os import listdir, path
from os.path import isfile, join
from re import IGNORECASE, compile
from uuid import uuid4

from api.graphql.filtersets import InvitesFilter
from api.utils.enums import GameStatus
from api.utils.graphql_errors import GraphQLErrors
from config.settings import env
from django.apps import apps
from django.contrib.auth import authenticate, get_user_model, user_logged_in
from django.core import management
from django.db import models
from django.db.models.expressions import OuterRef
from django.http.request import HttpRequest
from django.urls import reverse
from django.utils import timezone
from django.utils.safestring import mark_safe
from django.utils.translation import gettext as _
from graphene.utils.thenables import maybe_thenable
from graphql import GraphQLError
from graphql_jwt.decorators import (
    csrf_rotation,
    exceptions,
    on_token_auth_resolve,
    refresh_expiration,
    setup_jwt_cookie,
    signals,
)
from graphql_jwt.settings import jwt_settings
from graphql_jwt.utils import delete_cookie, get_payload, set_cookie


def catch_errors(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs) if func else None
        except Exception as e:
            regex = compile(r"\nCONTEXT.+", IGNORECASE)
            message = regex.sub("", str(e))
            raise GraphQLError(message)

    return wrapper


def load_data(filepath):
    data = open(filepath, encoding="utf-8")
    items = json.load(data)
    data.close()
    return items


def create_superuser(apps, schema_editor):
    try:
        management.call_command("createsuperusercfh", interactive=False)
    except Exception as error:
        return print(error)


def delete_superuser(apps, schema_editor):
    provider_model = apps.get_model("api.Provider")
    email = provider_model.objects.get(email=env("SUPERUSER_EMAIL"))
    return get_user_model().objects.get(pk=email.pk).delete()


def create_genres(filepath):
    def create(apps, schema_editor):
        Genre = apps.get_model("api", "Genre")
        genres = [Genre.objects.get_or_create(**item) for item in load_data(filepath)]

        return [item for item, created in genres]

    return create


def find_genre(description, genres):
    return genres.get(description=description)


def create_blackcards(filepath):
    def cards(apps, schema_editor):
        BlackCard = apps.get_model("api", "BlackCard")
        genres = apps.get_model("api", "Genre").objects.all()
        data = load_data(filepath)
        return [
            BlackCard.objects.get_or_create(
                **{**item, "genre": find_genre(item["genre"], genres)}
            )
            for item in data
        ]

    return cards


def create_whitecards(filepath):
    def cards(apps, schema_editor):
        WhiteCard = apps.get_model("api", "WhiteCard")
        genres = apps.get_model("api", "Genre").objects.all()
        data = load_data(filepath)
        return [
            WhiteCard.objects.get_or_create(
                **{**item, "genre": find_genre(item["genre"], genres)}
            )
            for item in data
        ]

    return cards


def filenames(dirpath):
    return [
        path.join(dirpath, f)
        for f in listdir(dirpath)
        if isfile(join(dirpath, f)) and re.match("^[A-Za-z]", f)
    ]


def expiry_date_min():
    return timezone.now() + timezone.timedelta(minutes=5.5)


def game_name(variation="for"):
    return "cards {0} humanity".format(variation)


def join_end_default():
    return timezone.now() + timezone.timedelta(milliseconds=30000)


def jwt_cookie(view_func):
    @wraps(view_func)
    def wrapped_view(request: HttpRequest, *args, **kwargs):
        request.jwt_cookie = True
        response = view_func(request, *args, **kwargs)

        if hasattr(request, "jwt_token"):
            expires = datetime.utcnow() + jwt_settings.JWT_EXPIRATION_DELTA
            if hasattr(request, "jwt_refresh_token"):
                refresh_token = request.jwt_refresh_token
                expires = (
                    refresh_token.created + jwt_settings.JWT_REFRESH_EXPIRATION_DELTA
                )

                set_cookie(
                    response,
                    jwt_settings.JWT_REFRESH_TOKEN_COOKIE_NAME,
                    refresh_token.token,
                    expires=expires,
                )

        if hasattr(request, "delete_jwt_cookie"):
            delete_cookie(response, jwt_settings.JWT_COOKIE_NAME)

        if hasattr(request, "delete_refresh_token_cookie"):
            delete_cookie(response, jwt_settings.JWT_REFRESH_TOKEN_COOKIE_NAME)

        return response

    return wrapped_view


def require_login(func):
    """Enforce user authentication for protected mutations.

    NOTE: Should only be applied to mutation functions!
    """

    def mutator(self, info, *args, **kwargs):
        """Prevent non-authenticated users from accessing protected mutations."""
        if info is None or info.context is None:
            raise GraphQLErrors(GraphQLErrors.NOT_AUTHORIZED)

        user = info.context.user
        if user is None or user.is_anonymous:
            raise GraphQLError(GraphQLErrors.NOT_AUTHORIZED)

        return func(self, info, *args, **kwargs)

    return mutator


def get_associated_admin_link(obj, model_attr, model_path, description_attr=None):
    """Create a Django admin link to an associated object.

    Args:
        obj (obj): Django admin model object
        model_attr (str): Linked attribute name on admin model (ie. "profile" for
            "user.profile")
        model_path (str): Django app name and model name for URL (separated by
            underscore)
        description_attr (str, optional): Linked object attribute to be shown in
            link description (after ID)
    """
    # Get linked object from model
    link_obj = getattr(obj, model_attr)
    if not link_obj:
        return None

    # Get linked object ID
    link_id = getattr(link_obj, "id")
    if not link_id:
        return None

    # Internal Django admin link ("change" form displays details)
    url = reverse("admin:{}_change".format(model_path), args=[link_id])
    if not url:
        return None

    # Optional link description
    link_description = ""
    if description_attr:
        description = getattr(link_obj, description_attr)
        if description:
            link_description = " - {}".format(description)

    return mark_safe(
        "<a href='{}'>{} ({}){}</a>".format(
            url, model_attr.capitalize(), link_id, link_description
        )
    )


def get_generic_object_admin_link(obj, id_attr="owner_id", type_attr="owner_type"):
    """Create a Django admin link to an associated generic object.

    Args:
        obj (obj): Django admin model object
        id_attr (string, optional): Attribute name on object referring to
            related object ID
        type_attr (string, optional): Attribute name on object referring to
            related object Django type
    """
    # Generic foreign key uses "django_content_type" table to track the
    #   owner's type and id.
    owner_id = getattr(obj, id_attr)
    owner_type = getattr(obj, type_attr)

    # "django_content_type" table tracks owner's app and model
    owner_app = getattr(owner_type, "app_label")
    owner_model = getattr(owner_type, "model")

    if not owner_app or not owner_model:
        return None

    # Owner's app and model are used to formulate the Django admin path
    model_path = "{}_{}".format(owner_app, owner_model)
    url = reverse("admin:{}_change".format(model_path), args=[owner_id])

    return mark_safe(
        "<a href='{}'>{} ({})</a>".format(url, owner_model.capitalize(), owner_id)
    )


def get_generic_parent_admin_link(obj):
    """Create a Django admin link to the object's generic parent object.

    Args:
        obj (obj): Django admin model object
    """
    return get_generic_object_admin_link(obj, "owner_id", "owner_type")


def get_user_by_payload(payload):
    provider_model = apps.get_model("api.Provider")
    username = jwt_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER(payload)
    user_id = payload.get("sub")
    user = None

    if username:
        user = provider_model.objects.get(email=username).user

    if not username and user_id:
        user = jwt_settings.JWT_GET_USER_BY_NATURAL_KEY_HANDLER(user_id)

    if not username and not user_id:
        raise exceptions.JSONWebTokenError(_("Invalid payload"))

    if user is not None and not getattr(user, "is_active", True):
        raise exceptions.JSONWebTokenError(_("User is disabled"))
    return user


def get_user_by_token(token, context=None):
    payload = get_payload(token, context)
    return get_user_by_payload(payload)


def jwt_payload(user, context):
    profile_model = apps.get_model("api.Profile")
    provider_model = apps.get_model("api.Provider")
    email = context.email if hasattr(context, "email") else None
    provider = (
        provider_model.objects.get(user=user, email=email)
        if email
        else provider_model.objects.filter(
            user=user
        ).first()  # figure out primary email feature
    )
    profile = profile_model.objects.get(provider=provider)
    host = os.getenv("HOST", None)
    claims_url = "{0}/claims".format(host)
    jwt_datetime = datetime.utcnow() + jwt_settings.JWT_EXPIRATION_DELTA
    jwt_expires = int(jwt_datetime.timestamp())
    iat = timegm(datetime.utcnow().utctimetuple())
    payload = {
        "iss": jwt_settings.JWT_ISSUER,
        "sub": b64encode("UserNode:{sub}".format(sub=user.id).encode("utf-8")).decode(
            "utf-8"
        ),
        "aud": jwt_settings.JWT_AUDIENCE,
        "exp": jwt_expires,
        "nbf": iat,
        "iat": iat,
        "jti": uuid4().hex,
        # For library compatibility
        "username": str(profile.username),
        "provider": str(profile.id),
        "name": profile.full_name.title(),
        "avatar": profile.avatar,
        "email": provider.email,
        "email_verified": provider.is_verified,
        claims_url: {
            "x-cfh-allowed-roles": [],
            "x-cfh-default-role": None,
            "x-cfh-user-id": str(user.id),
        },
    }

    return payload


def token_auth(f):
    @wraps(f)
    @setup_jwt_cookie
    @csrf_rotation
    @refresh_expiration
    def wrapper(cls, root, info, password, **kwargs):
        context = info.context
        context._jwt_token_auth = True
        username = kwargs.get("username")
        user = authenticate(
            request=context,
            username=username,
            password=password,
        )

        if user is None:
            raise exceptions.JSONWebTokenError(
                GraphQLErrors.USER_SIGNIN__INVALID_CREDENTIALS
            )

        if hasattr(context, "user"):
            context.user = user
            context.email = username

        result = f(cls, root, info, **kwargs)
        signals.token_issued.send(sender=cls, request=context, user=user)
        user_logged_in.send(
            sender=apps.get_model("api.User"),
            user=user,
            request=context,
            email=username,
        )
        return maybe_thenable((context, user, result), on_token_auth_resolve)

    return wrapper


def game_in_progress(user):
    player_model = apps.get_model("api.Player")
    game_model = apps.get_model("api.Game")

    try:
        player = player_model.objects.filter(
            ~models.Q(game__status=GameStatus.GE._value_), models.Q(user=user)
        ).first()
        if player is None:
            raise player_model.DoesNotExist()
        return player.game
    except (
        player_model.DoesNotExist,
        player_model.game.RelatedObjectDoesNotExist,
    ):
        return game_model.objects.filter(
            ~models.Q(status=GameStatus.GE._value_), models.Q(creator=user)
        ).first()


def get_ws_authorization(payload):
    auth = payload.get(jwt_settings.JWT_AUTH_HEADER_NAME, "").split()
    prefix = jwt_settings.JWT_AUTH_HEADER_PREFIX

    if len(auth) != 2 or auth[0].lower() != prefix.lower():
        return None
    return auth[1]


def get_invites(user, **kwargs):
    try:
        kwargs["game__status"] = GameStatus.GAP._value_
        email = kwargs.get("email")
        now = datetime.now()
        query_set = (
            InvitesFilter(kwargs)
            .qs.filter(game__status=GameStatus.GAP._value_, game__join_ends_at__gt=now)
            .extra(
                tables=["api_provider"],
                select={
                    "api_provider.user_id": "api_provider.user_id",
                },
                where=["api_provider.email = %s", "api_provider.user_id = %s"],
                params=[email, user.id],
            )
            .exclude(
                game__player_set__game=OuterRef("game"), game__player_set__user=user
            )
        )

        return query_set
    except apps.get_model("api.Provider").DoesNotExist:
        raise GraphQLError(GraphQLErrors.NOT_AUTHORIZED)
