from celery import shared_task


@shared_task(name="api.debug")
def debug(self):
    print(f"Request: {self.request!r}")
