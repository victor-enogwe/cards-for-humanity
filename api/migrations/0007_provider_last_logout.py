# Generated by Django 3.2.9 on 2021-12-09 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_provider_api_provider_email_or_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='provider',
            name='last_logout',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last logout'),
        ),
    ]
