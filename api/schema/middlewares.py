from graphql_jwt.decorators import login_required

class AuthorizationMiddleware(object):
    auth_fields = ['allWhiteCards', 'allBlackCards', 'game', 'verifyToken', 'refreshToken', 'revokeToken',]
    @login_required
    def auth(self, next, root, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return next(root, info, **kwargs)

    def resolve(self, next, root, info, **kwargs):
        if info.field_name in self.auth_fields:
            return self.auth(next, root, info, **kwargs) 
        return next(root, info, **kwargs)

class SubscriptionAuthorizationMiddleware(object):
    def resolve(next, root, info, **args):
        if info.field_name == 'user':
            return None
        return next(root, info, **args)

class DepromiseSubscription(object):
    def resolve(self, next, root, info, **kwargs):
        result = next(root, info, **kwargs)
        if info.operation.operation == 'subscription' and is_thenable(result):
            return result.get()
        return result


# ['__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__slots__', '__str__', '__subclasshook__', 'context', 'field_asts', 'field_name', 'fragments', 'operation', 'parent_type', 'path', 'return_type', 'root_value', 'schema', 'variable_values']