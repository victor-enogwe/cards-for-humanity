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
from django.contrib import admin
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import url
from django.views.generic import RedirectView
from django.urls import path
from api.schema import GraphqlWsConsumer
from config.settings import DEBUG
from config.views import AppGraphQLView, AppView


asgiurlpatterns = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(URLRouter([path('graphql/ws', GraphqlWsConsumer.as_asgi())]))
})

graphql_view = AppGraphQLView.as_view(graphiql=environ['DEBUG'])

graphql_prod_url = url(r'^graphql$', graphql_view)

graphql_dev_url = url(r'^graphql$', csrf_exempt(graphql_view))

urlpatterns = [
    url('admin/', admin.site.urls),
    graphql_dev_url if DEBUG else graphql_prod_url,
    url(r'^favicon.ico/$', RedirectView.as_view(url='/static/browser/favicon.ico')),
    url(r'^.*', AppView.as_view(template_name="index.html"), name="index")
]
