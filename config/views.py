import os
from re import IGNORECASE, sub

from csp.decorators import csp_update
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from django.template import Template
from django.template.context import Context
from django.utils.encoding import force_text
from django.views.generic.base import TemplateView
from graphene_django.views import GraphQLView
from Naked.toolshed.shell import muterun_js
from rx.core.observablebase import Observable

from config.settings import BASE_DIR, CSP_STYLE_SRC


class GraphiQLView(GraphQLView):
    graphiql_template = "graphiql.html"
    # Polyfill for window.fetch.
    whatwg_fetch_version = "3.6.2"
    whatwg_fetch_sri = "sha256-+pQdxwAcHJdQ3e/9S4RK6g8ZkwdMgFQuHvLuN5uyk5c="

    # React and ReactDOM.
    react_version = "17.0.2"
    react_sri = "sha256-Ipu/TQ50iCCVZBUsZyNJfxrDk0E2yhaEIz0vqI+kFG8="
    react_dom_sri = "sha256-nbMykgB6tsOFJ7OdVmPpdqMFVk4ZsqWocT6issAPUF0="
    # graphiql
    graphiql_version = "1.4.6"
    graphiql_sri = "sha256-tlxVFtFy80Ef6/oAHw6Chxy0Q6+Bijf6250V8n1n26k="
    graphiql_css_sri = "sha256-HADQowUuFum02+Ckkv5Yu5ygRoLllHZqg0TFZXY7NHI="
    # ws
    subscriptions_transport_ws_version = "0.11.0"
    subscriptions_transport_ws_sri = (
        "sha256-LrJG/jaHdVX6G2h4XMd1mmjSb60KaDa9K1RMl8xEO0o="
    )

    graphiql_csp = tuple(list(CSP_STYLE_SRC) + ["'unsafe-inline'", "cdn.jsdelivr.net"])
    graphiql_script_csp = tuple(list(graphiql_csp) + ["'unsafe-eval'"])

    @csp_update(
        STYLE_SRC=graphiql_csp,
        STYLE_SRC_ELEM=graphiql_csp,
        SCRIPT_SRC=graphiql_script_csp,
        SCRIPT_SRC_ELEM=graphiql_script_csp,
    )
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def execute_graphql_request(
        self, request, data, query, variables, operation_name, show_graphiql=False
    ):
        target_result = None

        def override_target_result(value):
            nonlocal target_result
            target_result = value

        execution_result = super().execute_graphql_request(
            request, data, query, variables, operation_name, show_graphiql
        )
        if execution_result:
            if isinstance(execution_result, Observable):
                target = execution_result.subscribe(
                    on_next=lambda value: override_target_result(value)
                )
                target.dispose()
            else:
                return execution_result

        return target_result


class AngularView(TemplateView):
    template_name: str = "angular"

    def format(self, request: HttpRequest) -> str:
        def replace(match_object) -> str:
            match = match_object.group(0)
            nonce = force_text(request.csp_nonce)
            group = {
                "<script": '<script nonce="{0}" '.format(nonce),
                "<style": '<style nonce="{0}" '.format(nonce),
            }

            return group[match]

        return replace

    def get_template(self, request=None):
        renderer = os.path.join(BASE_DIR, "static/main.js")
        js_render = muterun_js(renderer, request.build_absolute_uri(request.path))
        html = "{0}".format(js_render.stdout.decode(encoding="UTF-8"))
        html = sub(r"(<script)|(<style)", self.format(request), html, 0, IGNORECASE)
        template_html = """
        {load}
        {html}
        """.format(
            html=html, load="{% load cache i18n csp %}"
        )
        template = Template(template_html)

        return template

    def get(self, request=None, *args, **kwargs):
        kwargs.setdefault("content_type", self.content_type)
        context = self.get_context_data(**kwargs)
        template = self.get_template(request)
        return HttpResponse(template.render(Context(context)), request)
