# Generated by Django 3.2.10 on 2022-01-09 18:32

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20220106_0155'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blackcard',
            name='pick',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Pick One'), (2, 'Pick Two'), (3, 'Pick Three')], default=1, validators=[django.core.validators.MinValueValidator(1, message='value should be >= 1 and <= 3'), django.core.validators.MaxValueValidator(3, message='value should be >= 1 and <= 3')]),
        ),
    ]