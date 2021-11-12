import json
import os
import re
from datetime import datetime
from functools import wraps
from os import listdir, path
from os.path import isfile, join

from django.db import migrations
from django.http.request import HttpRequest
from django.utils import timezone
from graphql_jwt.settings import jwt_settings
from graphql_jwt.utils import delete_cookie, set_cookie

from api.models.user import User
from config.settings import env


def load_data(filepath):
    data = open(filepath, encoding='utf-8')
    items = json.load(data)
    data.close()
    return items


def create_admin(apps, schema_editor):
    try:
        return User.objects.create_superuser(
            username=env('ADMIN_USER'),
            email=env('ADMIN_EMAIL'),
            password=env('ADMIN_PASSWORD')
        )
    except:
        return print('admin user exists')


def delete_admin(apps, schema_editor):
    return User.objects.get(email=env('ADMIN_EMAIL')).delete()


def create_genres(filepath):
    def create(apps, schema_editor):
        Genre = apps.get_model('api', 'Genre')
        genres = [Genre.objects.get_or_create(
            **item) for item in load_data(filepath)]

        return [item for item, created in genres]
    return create


def find_genre(description, genres):
    try:
        return [item for item in genres if item.description == description][0]
    except:
        return None


def create_blackcards(filepath):
    def cards(apps, schema_editor):
        BlackCard = apps.get_model('api', 'BlackCard')
        genres = apps.get_model('api', 'Genre').objects.all()
        data = load_data(filepath)
        return [BlackCard.objects.get_or_create(**{**item, 'genre': find_genre(item['genre'], genres)}) for item in data]
    return cards


def create_whitecards(filepath):
    def cards(apps, schema_editor):
        WhiteCard = apps.get_model('api', 'WhiteCard')
        genres = apps.get_model('api', 'Genre').objects.all()
        data = load_data(filepath)
        return [WhiteCard.objects.get_or_create(**{**item, 'genre': find_genre(item['genre'], genres)}) for item in data]
    return cards


def filenames(dirpath):
    return [path.join(dirpath, f) for f in listdir(dirpath) if isfile(join(dirpath, f)) and re.match('^[A-Za-z]', f)]


def game_name(variation='for'):
    return 'cards {0} humanity'.format(variation)


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
