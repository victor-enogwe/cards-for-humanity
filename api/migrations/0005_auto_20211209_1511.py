# Generated by Django 3.2.9 on 2021-12-09 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20211207_2249'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='invite',
            name='unique_uid_invite_game',
        ),
        migrations.RemoveField(
            model_name='invite',
            name='uid',
        ),
        migrations.AddField(
            model_name='invite',
            name='email',
            field=models.EmailField(default=None, max_length=254, unique=True, verbose_name='email'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='invite',
            name='spectator',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='provider',
            name='email',
            field=models.EmailField(error_messages={'unique': 'A user with that email already exists.'}, max_length=254, unique=True, verbose_name='email'),
        ),
        migrations.AddConstraint(
            model_name='invite',
            constraint=models.UniqueConstraint(fields=('game', 'email'), name='unique_uid_invite_game'),
        ),
    ]
