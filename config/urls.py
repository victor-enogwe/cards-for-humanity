"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from os import environ

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from django.views.generic import RedirectView
from graphql_jwt.decorators import jwt_cookie

from api.schema import GraphqlWsConsumer
from config.views import AngularView, AppGraphQLView

angular_urls = [
    'auth',
    'auth/login',
    'auth/register',
    'auth/forgot-password',
    'auth/reset-password',
    'play/options',
    'play',
    'shop',
    '',
    '404',
]

asgiurlpatterns = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(URLRouter([path('graphql/ws', GraphqlWsConsumer.as_asgi())]))
})

graphql_view = AppGraphQLView.as_view(graphiql=environ['DEBUG'])

urlpatterns = [
    path('admin/doc/', include('django.contrib.admindocs.urls')),
    url('admin/', admin.site.urls),
    url('graphql', jwt_cookie(graphql_view)),
    url('favicon.ico',
        RedirectView.as_view(url='static/browser/assets/img/favicon.ico')),
] + [url(r'{0}'.format(uri), AngularView.as_view()) for uri in angular_urls]
