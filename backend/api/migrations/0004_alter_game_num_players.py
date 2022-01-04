# Generated by Django 3.2.10 on 2022-01-01 05:13

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_answer_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='num_players',
            field=models.PositiveSmallIntegerField(default=3, editable=False, help_text='no of players', validators=[django.core.validators.MinValueValidator(3, message='value should be >= 3 and <= 9'), django.core.validators.MaxValueValidator(9, message='value should be >= 3 and <= 9')]),
        ),
    ]
