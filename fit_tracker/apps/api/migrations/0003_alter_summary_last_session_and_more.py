# Generated by Django 4.2.1 on 2023-05-22 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_session_session_type_summary_session_summary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='summary',
            name='last_session',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='summary',
            name='total_distance',
            field=models.DecimalField(decimal_places=1, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='summary',
            name='total_length_time',
            field=models.DurationField(null=True),
        ),
        migrations.AlterField(
            model_name='summary',
            name='total_number_sessions',
            field=models.IntegerField(null=True),
        ),
    ]
