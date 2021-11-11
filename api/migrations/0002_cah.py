# Generated by Django 2.2.9 on 2020-01-24 07:46
from django.db import migrations

from api.models import User
from config.settings import env


def create_admin(apps, schema_editor):
    try:
        return User.objects.create_superuser(
            username=env('ADMIN_USER'),
            email=env('ADMIN_EMAIL'),
            password=env('ADMIN_PASSWORD')
        )
    except:
        return print('admin user exists')


def delete_admin(apps, schema_editor):
    return User.objects.get(email=env('ADMIN_EMAIL')).delete()


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = (
        [migrations.RunPython(create_admin, delete_admin)]
    )
