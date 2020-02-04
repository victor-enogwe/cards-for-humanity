from django.contrib.auth.backends import ModelBackend, get_user_model

class EmailOrUsernameModelBackend(ModelBackend):
    '''This is a ModelBacked that allows authentication with either a username or an email address.'''
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(get_user_model().USERNAME_FIELD)
        if password is None:
            password = kwargs.get(get_user_model().PASSWORD_FIELD)
            
        # case insensitive lookup by email **email__iexact**
        field = 'email__iexact' if '@' in username else 'username'
        kwargs = { field: username }

        try:
            user = get_user_model().objects.get(**kwargs)
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
        except get_user_model().DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            get_user_model().set_password(password)
