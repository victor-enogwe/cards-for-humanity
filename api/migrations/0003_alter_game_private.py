# Generated by Django 3.2.9 on 2021-12-07 21:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_cah'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='private',
            field=models.BooleanField(default=True),
        ),
    ]
