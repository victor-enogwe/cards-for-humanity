# Generated by Django 2.2.9 on 2020-01-24 07:46
from os import path

from django.db import migrations

from api.utils.functions import (
    create_blackcards,
    create_genres,
    create_superuser,
    create_whitecards,
    delete_superuser,
    filenames,
)
from config.settings import BASE_DIR


class Migration(migrations.Migration):
    genres = filenames(path.join(BASE_DIR, "api/fixtures/cah/genres"))
    blackcards = filenames(path.join(BASE_DIR, "api/fixtures/cah/blackcards"))
    whitecards = filenames(path.join(BASE_DIR, "api/fixtures/cah/whitecards"))

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = (
        [migrations.RunPython(create_superuser, delete_superuser)]
        + [migrations.RunPython(create_genres(path)) for path in genres]
        + [migrations.RunPython(create_blackcards(path)) for path in blackcards]
        + [migrations.RunPython(create_whitecards(path)) for path in whitecards]
    )
