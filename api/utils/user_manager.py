from django.db import models


class UserManager(models.Manager):
    """Django manager for user model."""
    use_in_migrations = True

    def get_by_natural_key(self, username):
        return self.get(**{self.model.username: username})
