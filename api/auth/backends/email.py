from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.http import HttpRequest
from graphql import GraphQLError

from api.models.password import Password
from api.models.provider import Provider
from api.utils.constants import old_password_error_message
from api.utils.graphql_errors import GraphQLErrors


class EmailModelBackend(ModelBackend):
    '''This is a ModelBacked that allows authentication with an email address.'''

    def authenticate(self, request: HttpRequest, username: str = None, password: str = None, **kwargs):
        email = username
        if email is None:
            email = kwargs.get('email')
        if password is None:
            password = kwargs.get(Password.PASSWORD_FIELD)
        print(email, username, password, kwargs)

        if email is None or password is None:
            raise GraphQLError(GraphQLErrors.USER_SIGNIN__INVALID_CREDENTIALS)

        try:
            provider: Provider = Provider.objects.get(email=email)
            user = provider.user
            auth_password = Password.objects.get(user=user, is_active=True)

            if not auth_password.is_active:
                raise GraphQLError(old_password_error_message)

            if not check_password(password, auth_password.password):
                raise GraphQLError(
                    GraphQLErrors.USER_SIGNIN__INVALID_CREDENTIALS
                )

            if not self.user_can_authenticate(user):
                raise GraphQLError(GraphQLErrors.USER_SIGNIN__INACTIVE_USER)

            if not provider.is_verified:
                raise GraphQLError(GraphQLErrors.NOT_VERIFIED)

            return user
        except (Password.DoesNotExist, User.DoesNotExist, Provider.DoesNotExist):
            raise GraphQLError(
                GraphQLErrors.USER_SIGNIN__INVALID_CREDENTIALS
            )
