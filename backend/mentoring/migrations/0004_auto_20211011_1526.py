# Generated by Django 3.2 on 2021-10-11 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentoring', '0003_alter_mentoring_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='mentoring',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='mentoring',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
