# Generated by Django 3.2.8 on 2021-10-24 18:35

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20211020_2348'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='num_spectators',
            field=models.PositiveSmallIntegerField(default=0, editable=False, help_text='no of spectators', validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)]),
        ),
        migrations.AlterField(
            model_name='game',
            name='num_players',
            field=models.PositiveSmallIntegerField(default=0, editable=False, help_text='no of players', validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)]),
        ),
        migrations.AlterField(
            model_name='game',
            name='rounds',
            field=models.SmallIntegerField(default=5, editable=False, help_text='no of game rounds', validators=[django.core.validators.MinValueValidator(5), django.core.validators.MaxValueValidator(50)]),
        ),
        migrations.AlterField(
            model_name='game',
            name='status',
            field=models.CharField(choices=[], default='GAP', max_length=3),
        ),
    ]
