from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = "api"

    def ready(self) -> None:
        import api.celery  # noqa: F401
        import api.receivers  # noqa: F401
        import api.tasks  # noqa: F401

        return super().ready()
