from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = "api"

    def ready(self) -> None:
        import api.celery
        import api.receivers

        return super().ready()
