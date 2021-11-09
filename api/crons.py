from django.core import management
from django_cron import CronJobBase, Schedule


class CleanupCron(CronJobBase):
    RUN_EVERY_MINS = 1440
    RETRY_AFTER_FAILURE_MINS = 5

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS,
                        retry_after_failure_mins=RETRY_AFTER_FAILURE_MINS)
    code = 'api.cron.cleanup_cron'

    def do(self):
        management.call_command('cleartokens', expired=True)
