from graphql.backend import GraphQLCoreBackend
from graphene_django.views import GraphQLView
from rx.core import ObservableBase
from api.schema.game import GameSubscriptionType

class GraphQLCustomCoreBackend(GraphQLCoreBackend):
    def __init__(self, executor=None):
        # type: (Optional[Any]) -> None
        super().__init__(executor)
        self.execute_params['allow_subscriptions'] = True


class AppGraphQLView(GraphQLView):
    def execute_graphql_request(
            self, request, data, query, variables, operation_name, show_graphiql=False
    ):
        target_result = None

        def override_target_result(value):
            nonlocal target_result
            target_result = value

        execution_result = super().execute_graphql_request(request, data, query, variables, operation_name, show_graphiql)
        if execution_result:
            if isinstance(execution_result, ObservableBase):
                target = execution_result.subscribe(on_next=lambda value: override_target_result(value))
                target.dispose()
            else:
                return execution_result

        return target_result