import os
from re import IGNORECASE, sub

from django.http.request import HttpRequest
from django.template import Template, TemplateDoesNotExist
from django.template.backends.django import DjangoTemplates, reraise
from django.template.backends.utils import csrf_input_lazy, csrf_token_lazy
from django.template.context import make_context
from django.utils.encoding import force_text
from django.views.generic.base import TemplateView
from Naked.toolshed.shell import muterun_js

from config.settings import BASE_DIR


class AngularTemplate:
    template_name: str = "angular"

    def __init__(self, template: Template, backend: DjangoTemplates):
        self.template = template
        self.backend = backend

    @property
    def origin(self):
        return self.template.origin

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

    def html_render(self, request=None, context=None):
        renderer = os.path.join(BASE_DIR, "static/main.js")
        js_render = muterun_js(renderer, request.build_absolute_uri(request.path))
        html = "{0}".format(js_render.stdout.decode(encoding="UTF-8"))
        html = sub(r"(<script)|(<style)", self.format(request), html, 0, IGNORECASE)
        self.template.source = """
        {load}
        {html}
        """.format(
            html=html, load="{% load cache i18n csp %}"
        )

        self.template.nodelist = self.template.compile_nodelist()

        return self.template.render(context)

    def render_type(self, request: HttpRequest):
        content_types = request.META.get("HTTP_ACCEPT").split(",")
        extension = request.path.split(".")[-1]

        return content_types + [extension]

    def render(self, context=None, request=None):
        if context is None:
            context = {}
        if request is not None:
            context["request"] = request
            context["csrf_input"] = csrf_input_lazy(request)
            context["csrf_token"] = csrf_token_lazy(request)
        context = make_context(
            context, request, autoescape=self.backend.engine.autoescape
        )

        try:
            return self.html_render(request, context)
        except TemplateDoesNotExist as exc:
            reraise(exc, self.backend)


class AngularTemplateEngine(DjangoTemplates):
    html: str = None

    def from_string(self, template_code):
        return AngularTemplate(self.engine.from_string(template_code), self)

    def get_template(self, template_name) -> TemplateView:
        return self.from_string(template_name)
