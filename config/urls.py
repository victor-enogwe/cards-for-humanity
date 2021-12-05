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
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import RedirectView

from api.graphql.ws_consumer import GraphqlWsConsumer
from api.utils.functions import jwt_cookie
from config.settings import DEBUG
from config.views import AngularView, GraphiQLView

angular_paths = [
    "auth/?",
    "auth/login/?",
    "auth/register/?",
    "auth/forgot-password/?",
    "auth/reset-password/?",
    "play/options/?",
    "play/?",
    "shop/?",
    "",
    "404/?",
]

angular_urls = [
    url(r"{0}$".format(uri), AngularView.as_view()) for uri in angular_paths
]

asgiurlpatterns = ProtocolTypeRouter(
    {
        "websocket": AuthMiddlewareStack(
            URLRouter([path("graphql/ws", GraphqlWsConsumer.as_asgi())])
        )
    }
)

graphql_view = GraphiQLView.as_view(graphiql=environ["DEBUG"])

urlpatterns = [
    path("admin/doc/", include("django.contrib.admindocs.urls")),
    url("admin/", admin.site.urls),
    url("graphql", jwt_cookie(csrf_exempt(graphql_view)) if DEBUG else graphql_view),
    url(
        "favicon.ico", RedirectView.as_view(url="static/browser/assets/img/favicon.ico")
    ),
    path("app/", include(angular_urls)),
]
