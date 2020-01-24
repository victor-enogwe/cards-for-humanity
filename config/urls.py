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
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from graphene_django_extras.views import AuthenticatedGraphQLView, ExtraGraphQLView
from channels import include, routing
from django.views.generic.base import TemplateView
from config.views import GraphQLCustomCoreBackend, AppGraphQLView, SubscriptionDemultiplexer


app_routing = [routing.route_class(SubscriptionDemultiplexer)]

socketpatterns = [include(app_routing, path=r"^/websocket")]

urlpatterns = [
    url('admin/', admin.site.urls),
    url(r'^graphql$', csrf_exempt(AppGraphQLView.as_view(graphiql=environ['DEBUG'], backend=GraphQLCustomCoreBackend()))),
    url(r'^.*', TemplateView.as_view(template_name="index.html"), name="index")
]
