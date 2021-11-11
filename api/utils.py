import os
from datetime import datetime
from functools import wraps

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.http.request import HttpRequest
from django.utils import timezone
from graphene import Int, relay
from graphql_jwt.settings import jwt_settings
from graphql_jwt.utils import delete_cookie, set_cookie


def game_name(variation='for'):
    return 'cards {0} humanity'.format(variation)


def min_max_validator(min, max):
    message = 'value should be >= {0} and <= {1}'.format(min, max)
    return [MinValueValidator(min, message=message), MaxValueValidator(max, message=message)]


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
                print(refresh_token)
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


def jwt_payload(user, context=None):
    host = os.getenv("HOST", None)
    claims_url = '{0}/claims'.format(host)
    jwt_datetime = datetime.utcnow() + jwt_settings.JWT_EXPIRATION_DELTA
    jwt_expires = int(jwt_datetime.timestamp())
    payload = {}
    payload['username'] = str(user.username)  # For library compatibility
    payload['sub'] = str(user.id)
    payload['sub_name'] = user.username
    payload['sub_email'] = user.email
    payload['exp'] = jwt_expires
    payload[claims_url] = {}
    payload[claims_url]['x-cah-allowed-roles'] = [user.profile.role]
    payload[claims_url]['x-cah-default-role'] = user.profile.role
    payload[claims_url]['x-cah-user-id'] = str(user.id)
    return payload


class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()


class ExtendedConnection(relay.Connection):
    class Meta:
        abstract = True

    total_count = Int()
    edge_count = Int()

    def resolve_total_count(root, info, **kwargs):
        return root.length

    def resolve_edge_count(root, info, **kwargs):
        return len(root.edges)
