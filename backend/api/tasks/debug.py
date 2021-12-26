from celery import shared_task


@shared_task(bind=True)
def debug(self):
    print(f"Request: {self.request!r}")
