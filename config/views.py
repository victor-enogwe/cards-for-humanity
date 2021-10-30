from django.views.generic.base import TemplateView
from graphene_django.views import GraphQLView
from rx.core.observable import observable
from django.conf.urls import url

class AppGraphQLView(GraphQLView):
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
