import graphene
from django.contrib.auth import get_user_model
from graphql_jwt.refresh_token.shortcuts import create_refresh_token
from graphql_jwt.shortcuts import get_token

from api.models.profile import Profile
from api.graphql.types import CreateUserFailEmailExists, CreateUserFailOthers, CreateUserMutation, CreateUserSuccess


class CreateUserMutation(graphene.Mutation):
    Output = CreateUserMutation

    class Input:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, password, email, **kwargs):
        user_model = get_user_model()
        if user_model.objects.filter(email=email).exists():
            return CreateUserFailEmailExists(
                error_message="User with this email exists"
            )
        try:
            user = user_model(email=email, username=email)
            user.set_password(password)
            user.save()
            profile = Profile.objects.get(user=user.id)
            token = get_token(user)
            refresh_token = create_refresh_token(user)

            return CreateUserSuccess(user=user, profile=profile, token=token, refresh_token=refresh_token)
        except:
            return CreateUserFailOthers(error_message="User not created, something went wrong, please try again!")
