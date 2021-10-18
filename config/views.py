# import v8eval
import os
from django.views import View
from django.views.generic.base import TemplateView
from Naked.toolshed.shell import muterun_js
from django.http import HttpResponse
from graphene_django.views import GraphQLView
from rx.core.observable import observable
from api.schema.game import GameSubscriptionType
from config.settings import BASE_DIR, DEBUG


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


class AppView(TemplateView):
    # v8 = V8Eval::V8.new

    def get(self, request, *args, **kwargs):
        renderer = os.path.join(BASE_DIR, 'static/server/main.js')
        context = self.get_context_data(**kwargs)
        response = muterun_js(
            renderer, request.build_absolute_uri(request.path))
        if DEBUG:
            return HttpResponse(response.stdout)
        return HttpResponse(response.stdout) if '</html>' in response.stdout.decode("utf-8") else self.render_to_response(context)
