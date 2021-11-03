from csp.decorators import csp_update
from django.conf.urls import url
from django.views.generic.base import TemplateView
from graphene_django.views import GraphQLView
from rx.core.observable import observable

from config.settings import CSP_STYLE_SRC


class AppGraphQLView(GraphQLView):
    graphiql_template = "graphiql"

    graphiql_csp = tuple(list(CSP_STYLE_SRC) + ["cdn.jsdelivr.net"])

    @csp_update(
        STYLE_SRC=graphiql_csp,
        SCRIPT_SRC=graphiql_csp,
        STYLE_SRC_ELEM=graphiql_csp,
        SCRIPT_SRC_ELEM=graphiql_csp
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
            request, data, query, variables, operation_name, show_graphiql)
        if execution_result:
            if isinstance(execution_result, observable.Observable):
                target = execution_result.subscribe(
                    on_next=lambda value: override_target_result(value))
                target.dispose()
            else:
                return execution_result

        return target_result


class AngularView(TemplateView):
    template_name = "angular"

    @staticmethod
    def create_view(uri: str):
        return url(uri, AngularView.as_view())

    def get_template_names(self):
        return [self.template_name]
