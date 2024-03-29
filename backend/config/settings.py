"""
Django settings for app project.

Generated by 'django-admin startproject' using Django 3.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import sys
from datetime import timedelta

import environ
from corsheaders.defaults import default_headers

env = environ.Env(DEBUG=(bool, True))

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = environ.Path(__file__) - 2

DEBUG = env("DEBUG")

if DEBUG:
    environ.Env.read_env(
        env.str("ENV_PATH", "%s/.env" % (BASE_DIR - 1))
    )  # reading .env file

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

ENV = env("ENV")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

HOSTS = env.get_value("ALLOWED_HOSTS", None, "")

ENV_HOSTS = HOSTS.split(",") if len(HOSTS) > 0 else []

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

NO_ALLOWED_HOST = len(ENV_HOSTS) < 1

ALLOWED_HOSTS = (
    ["localhost", "127.0.0.1", "lvh.me"]
    if DEBUG
    else ["*"]
    if NO_ALLOWED_HOST
    else ENV_HOSTS
)

DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL")

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env("GOOGLE_OAUTH_CLIENT_ID", default="")

SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env("GOOGLE_OAUTH_CLIENT_SECRET", default="")

SOCIAL_AUTH_FACEBOOK_KEY = env("FACEBOOK_APP_ID", default="")

SOCIAL_AUTH_FACEBOOK_SECRET = env("FACEBOOK_APP_SECRET", default="")

AUTH_USER_MODEL = "api.User"

SECURE = True

CORS_ORIGIN_WHITELIST = ENV_HOSTS

CORS_ORIGIN_ALLOW_ALL = NO_ALLOWED_HOST

CSRF_TRUSTED_ORIGINS = env.get_value("CSRF_TRUSTED_ORIGINS", None, "*").split(",")

CORS_ALLOW_METHODS = ["GET", "OPTIONS", "POST"]

CORS_ALLOW_HEADERS = list(default_headers) + [
    "apollographql-client-name",
    "apollographql-client-version",
]

CORS_ALLOW_CREDENTIALS = True

SECURE_SSL_REDIRECT = env("ENV") == "production"

SECURE_BROWSER_XSS_FILTER = SECURE

SECURE_CONTENT_TYPE_NOSNIFF = SECURE

CSRF_COOKIE_SECURE = SECURE

CSRF_USE_SESSIONS = False

CSRF_COOKIE_HTTPONLY = False

SESSION_COOKIE_HTTPONLY = SECURE

SESSION_COOKIE_SECURE = SECURE

SESSION_COOKIE_SAMESITE = "Strict"

CSRF_COOKIE_SAMESITE = "Strict"

SESSION_COOKIE_AGE = 604800

SESSION_COOKIE_NAME = "cfh_session"

CSP_DEFAULT_SRC = "'self'"

CSP_IMG_SRC = ("'self'",)

CSP_STYLE_SRC = ("'self'", "fonts.googleapis.com")

CSP_STYLE_SRC_ELEM = CSP_STYLE_SRC

CSP_SCRIPT_SRC = "'self'"

CSP_SCRIPT_SRC_ELEM = CSP_SCRIPT_SRC

CSP_FONT_SRC = ("'self'", "fonts.googleapis.com", "fonts.gstatic.com")

CSP_INCLUDE_NONCE_IN = ["script-src", "style-src", "img-src"]

DEV_EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

PROD_EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_BACKEND = DEV_EMAIL_BACKEND if DEBUG else PROD_EMAIL_BACKEND

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.admindocs",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_filters",
    "django_celery_beat",
    "pgtrigger",
    "phonenumber_field",
    "django_cron",
    "graphene_django",
    "channels",
    "corsheaders",
    "social_django",
    "rest_framework",
    "graphql_jwt.refresh_token.apps.RefreshTokenConfig",
    "api",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "csp.middleware.CSPMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "social_django.middleware.SocialAuthExceptionMiddleware",
    "django.middleware.cache.UpdateCacheMiddleware",
    "django.middleware.cache.FetchFromCacheMiddleware",
]

# Authentication backends
AUTHENTICATION_BACKENDS = [
    # "graphql_jwt.backends.JSONWebTokenBackend",
    "api.auth.backends.jwt.JWTBackend",
    "api.auth.backends.email.EmailModelBackend",
    "social_core.backends.google.GoogleOAuth2",
    "social_core.backends.facebook.FacebookOAuth2",
]

CRON_CLASSES = ["api.crons.CleanupCron"]

DJANGO_CRON_DELETE_LOGS_OLDER_THAN = 7

FAILED_RUNS_CRONJOB_EMAIL_PREFIX = "[Failed Cron Jobs]: "

SOCIAL_AUTH_PIPELINE = [
    # Get the information we can about the user and return it in a simple
    # format to create the user instance later. On some cases the details are
    # already part of the auth response from the provider, but sometimes this
    # could hit a provider API.
    "social_core.pipeline.social_auth.social_details",
    # Get the social uid from whichever service we're authing thru. The uid is
    # the unique identifier of the given user in the provider.
    "social_core.pipeline.social_auth.social_uid",
    # Verifies that the current auth process is valid within the current
    # project, this is where emails and domains whitelists are applied (if
    # defined).
    "social_core.pipeline.social_auth.auth_allowed",
    # Checks if the current social-account is already associated in the site.
    "social_core.pipeline.social_auth.social_user",
    # Make up a username for this person, appends a random string at the end if
    # there's any collision.
    "social_core.pipeline.user.get_username",
    "social_core.pipeline.social_auth.associate_by_email",
    # Send a validation email to the user to verify its email address.
    # Disabled by default.
    # 'social_core.pipeline.mail.mail_validation',
    # Associates the current social details with another user account with
    # a similar email address. Disabled by default.
    # 'social_core.pipeline.social_auth.associate_by_email',
    # Create a user account if we haven't found one yet.
    "social_core.pipeline.user.create_user",
    # Create the record that associates the social account with the user.
    "social_core.pipeline.social_auth.associate_user",
    # Populate the extra_data field in the social record with the values
    # specified by settings (and the default ones like access_token, etc).
    "social_core.pipeline.social_auth.load_extra_data",
    # Update the user record with any changed info from the auth service.
    "social_core.pipeline.user.user_details",
]

ROOT_URLCONF = "config.urls"

GQL_MIDDLEWARE = [
    # "api.graphql.middlewares.gql_auth.AuthorizationMiddleware",
    "graphql_jwt.middleware.JSONWebTokenMiddleware",
]

GRAPHENE = {
    # Where your Graphene schema lives
    "SCHEMA": "api.graphql.ws_consumer.gql_schema",
    "SCHEMA_INDENT": 2,
    # we can set the 'max_limit' kwarg on your DjangoConnectionField too
    "RELAY_CONNECTION_MAX_LIMIT": sys.maxsize,
    "RELAY_CONNECTION_ENFORCE_FIRST_OR_LAST": True,
    "MIDDLEWARE": (["graphene_django.debug.DjangoDebugMiddleware"] if DEBUG else [])
    + GQL_MIDDLEWARE,
    "JWT_VERIFY_EXPIRATION": True,
    "DJANGO_CHOICE_FIELD_ENUM_V3_NAMING": True,
    "GRAPHIQL_HEADER_EDITOR_ENABLED": True,
    "SUBSCRIPTION_PATH": "/graphql/ws",
}

GRAPHQL_JWT = {
    "JWT_AUDIENCE": "cfh",
    "JWT_COOKIE_NAME": "CFH",
    "JWT_REFRESH_TOKEN_COOKIE_NAME": "CFH_TM",
    "JWT_AUTH_HEADER_PREFIX": "Bearer",
    "JWT_PAYLOAD_HANDLER": "api.utils.functions.jwt_payload",
    "JWT_PAYLOAD_GET_USERNAME_HANDLER": (lambda payload: payload.get("email")),
    "JWT_COOKIE_SECURE": True,
    "JWT_COOKIE_SAMESITE": "Strict",
    "JWT_CSRF_ROTATION": True,
    "JWT_HIDE_TOKEN_FIELDS": False,
    "JWT_LONG_RUNNING_REFRESH_TOKEN": True,
    "JWT_REUSE_REFRESH_TOKENS": False,
    "JWT_VERIFY": True,
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_ALLOW_REFRESH": True,
    "JWT_SECRET_KEY": SECRET_KEY,
    "JWT_EXPIRATION_DELTA": timedelta(minutes=5),
    "JWT_REFRESH_EXPIRATION_DELTA": timedelta(days=7),
}

FIXTURE_DIRS = [
    os.path.join(BASE_DIR, "api/fixtures/cfh/{path}".format(path=path))
    for path in ["genres", "blackcards", "whitecards"]
]

MEDIA_ROOT = os.path.join(BASE_DIR, "uploads/")

STATIC_ROOT = os.path.join(BASE_DIR - 1, "static/")

ANGULAR_STATIC_PATH = os.path.join(BASE_DIR - 1, "static/browser/")

if not os.path.exists(ANGULAR_STATIC_PATH):
    os.makedirs(ANGULAR_STATIC_PATH)

DJANGO_TEMPLATE_PATH = os.path.join(BASE_DIR, "config/template/static/")

STATICFILES_DIRS = [ANGULAR_STATIC_PATH]

STATIC_URL = "/static/browser/"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "APP_DIRS": True,
        "DIRS": [DJANGO_TEMPLATE_PATH],
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "csp.context_processors.nonce",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "social_django.context_processors.backends",
                "social_django.context_processors.login_redirect",
            ],
            "libraries": {"csp": "csp.templatetags.csp"},
        },
    },
]

# In this simple example we use in-process in-memory Channel layer.
# In a real-life cases you need Redis or something familiar.
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("localhost", 6379)],
        },
    },
}


WSGI_APPLICATION = "config.wsgi.application"

ASGI_APPLICATION = "config.urls.asgiurlpatterns"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

SESSION_ENGINE = "django.contrib.sessions.backends.signed_cookies"

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env.str("DB_NAME"),
        "HOST": env.str("DB_HOST"),
        "USER": env.str("DB_USER"),
        "PORT": env.str("DB_PORT"),
        "PASSWORD": env.str("DB_PASSWORD"),
        "TIME_ZONE": "UTC",
        "CONN_MAX_AGE": 0,
        "CHARSET": "UTF8",
        "OPTIONS": {},
        "TEST": {"NAME": "cfh-test-db"},
    }
}

REDIS_USERNAME = env("REDIS_USERNAME")

REDIS_PASSWORD = env("REDIS_PASSWORD")

REDIS_HOST = env("REDIS_HOST")

REDIS_PORT = env("REDIS_PORT")

REDIS_DB = env("REDIS_DB")

REDIS_URL = f"redis://{REDIS_USERNAME}{':' if REDIS_PASSWORD else ''}{REDIS_PASSWORD}{'@' if REDIS_USERNAME or REDIS_PASSWORD else ''}{REDIS_HOST}:{REDIS_PORT}{'/' if REDIS_DB else ''}{REDIS_DB}"

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{REDIS_USERNAME}{'@' if REDIS_USERNAME else ''}{REDIS_HOST}:{REDIS_PORT}{'/' if REDIS_DB else ''}{REDIS_DB}",
        "OPTIONS": {
            "DB": env("REDIS_DB"),
            "PASSWORD": env("REDIS_PASSWORD"),
            "SOCKET_TIMEOUT": 5,
            "SOCKET_CONNECT_TIMEOUT": 5,
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "CONNECTION_POOL_CLASS": "redis.BlockingConnectionPool",
            "PARSER_CLASS": "redis.connection.HiredisParser",
            "SERIALIZER_CLASS": "redis_cache.serializers.JSONSerializer",
            "COMPRESSOR_CLASS": "redis_cache.compressors.ZLibCompressor",
            "CONNECTION_POOL_CLASS_KWARGS": {"max_connections": 50, "timeout": 20},
            "COMPRESSOR_CLASS_KWARGS": {"level": 5},
            "SERIALIZER_CLASS_KWARGS": {},
        },
        "KEY_PREFIX": "cfh",
    }
}

# CELERY_ACKS_LATE = True

CELERY_BROKER_URL = REDIS_URL

CELERY_TASK_TIME_LIMIT = 60

CELERY_TASK_TRACK_STARTED = True

CELERY_ACCEPT_CONTENT = ["application/json"]  # Ignore other content

CELERY_TASK_SERIALIZER = "json"

CELERY_RESULT_SERIALIZER = "json"

CELERY_ENABLE_UTC = True

CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
    {"NAME": "api.utils.validators.RegexPasswordValidator"},
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True
