"""
Django settings for app project.

Generated by 'django-admin startproject' using Django 3.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os, sys, environ

# source enviromment variables
root = environ.Path(__file__) - 3  # get root of the project
env = environ.Env(DEBUG=(bool, False))

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

environ.Env.read_env(env.str('ENV_PATH', '%s/.env' % (BASE_DIR)))  # reading .env file

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ENV_HOSTS = env('ALLOWED_HOSTS').split(',')

ALLOWED_HOSTS = (['localhost', '127.0.0.1'] if DEBUG else []) + ENV_HOSTS

CORS_ORIGIN_WHITELIST = ENV_HOSTS

CORS_ALLOW_CREDENTIALS = True

DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL')

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env('GOOGLE_OAUTH_CLIENT_ID', default='')

SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env('GOOGLE_OAUTH_CLIENT_SECRET', default='')

SOCIAL_AUTH_FACEBOOK_KEY = env('FACEBOOK_APP_ID', default='')
SOCIAL_AUTH_FACEBOOK_SECRET = env('FACEBOOK_APP_SECRET', default='')

AUTH_USER_MODEL="api.User"

# Application definition

INSTALLED_APPS = [
    'channels',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'graphene_django',
    'social_django',
    'api'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware'
]

# Authentication backends
AUTHENTICATION_BACKENDS = [
    'graphql_jwt.backends.JSONWebTokenBackend',
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
]

SOCIAL_AUTH_PIPELINE = [
    # Get the information we can about the user and return it in a simple
    # format to create the user instance later. On some cases the details are
    # already part of the auth response from the provider, but sometimes this
    # could hit a provider API.
    'social_core.pipeline.social_auth.social_details',

    # Get the social uid from whichever service we're authing thru. The uid is
    # the unique identifier of the given user in the provider.
    'social_core.pipeline.social_auth.social_uid',

    # Verifies that the current auth process is valid within the current
    # project, this is where emails and domains whitelists are applied (if
    # defined).
    'social_core.pipeline.social_auth.auth_allowed',

    # Checks if the current social-account is already associated in the site.
    'social_core.pipeline.social_auth.social_user',

    # Make up a username for this person, appends a random string at the end if
    # there's any collision.
    'social_core.pipeline.user.get_username',

    'social_core.pipeline.social_auth.associate_by_email',

    # Send a validation email to the user to verify its email address.
    # Disabled by default.
    # 'social_core.pipeline.mail.mail_validation',

    # Associates the current social details with another user account with
    # a similar email address. Disabled by default.
    # 'social_core.pipeline.social_auth.associate_by_email',

    # Create a user account if we haven't found one yet.
    'social_core.pipeline.user.create_user',

    # Create the record that associates the social account with the user.
    'social_core.pipeline.social_auth.associate_user',

    # Populate the extra_data field in the social record with the values
    # specified by settings (and the default ones like access_token, etc).
    'social_core.pipeline.social_auth.load_extra_data',

    # Update the user record with any changed info from the auth service.
    'social_core.pipeline.user.user_details',
]

ROOT_URLCONF = 'config.urls'

GQL_MIDDLEWARE = [
    'graphql_jwt.middleware.JSONWebTokenMiddleware',
    'api.schema.middlewares.AuthorizationMiddleware',
    'api.schema.middlewares.DepromiseSubscription'
]

GRAPHENE = {
    'SCHEMA': 'api.schema.schema',  # Where your Graphene schema lives
    'SCHEMA_INDENT': 2,
    'RELAY_CONNECTION_MAX_LIMIT': sys.maxsize,  # we can set the 'max_limit' kwarg on your DjangoConnectionField too
    'RELAY_CONNECTION_ENFORCE_FIRST_OR_LAST': True,
    'MIDDLEWARE': (['graphene_django.debug.DjangoDebugMiddleware'] if DEBUG else []) + GQL_MIDDLEWARE,
    'JWT_VERIFY_EXPIRATION': True,
}

STATIC_PATH = os.path.join(BASE_DIR, 'static')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [STATIC_PATH],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

STATICFILES_DIRS = [STATIC_PATH]

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


WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.urls.asgiurlpatterns'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': env.str('DB_NAME'),
        'HOST': env.str('DB_HOST'),
        'USER': env.str('DB_USER'),
        'PASSWORD': env.str('DB_PASSWORD')
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = False

USE_L10N = False

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
