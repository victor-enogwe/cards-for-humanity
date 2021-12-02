# Generated by Django 3.2.9 on 2021-11-25 03:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_cah'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='avatar',
            field=models.CharField(choices=[('abby', 'Abby'), ('alfred', 'Alfred'), ('andina', 'Andina'), ('astro', 'Astro'), ('camile', 'Camile'), ('dorothy', 'Dorothy'), ('dudai', 'Dudai'), ('eduardo', 'Eduardo'), ('general', 'General'), ('grace', 'Grace'), ('iranir', 'Iranir'), ('jennifer', 'Jennifer'), ('labrat', 'Labrat'), ('luther', 'Luther'), ('rainbowness', 'Rainbowness'), ('shin', 'Shin')], default=('camile', 'Camile'), max_length=20),
        ),
    ]
