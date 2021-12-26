# Generated by Django 3.2.9 on 2021-12-25 16:32

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_invite_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='round',
            field=models.SmallIntegerField(default=0, editable=False, help_text='game round', validators=[django.core.validators.MinValueValidator(1, message='value should be >= 1 and <= 50'), django.core.validators.MaxValueValidator(50, message='value should be >= 1 and <= 50')]),
        ),
        migrations.AlterField(
            model_name='blackcard',
            name='pick',
            field=models.CharField(choices=[(1, 'PICK 1'), (2, 'PICK 2')], default='1', max_length=5),
        ),
    ]
