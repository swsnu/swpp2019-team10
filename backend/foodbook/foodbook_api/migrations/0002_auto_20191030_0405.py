# Generated by Django 2.2.4 on 2019-10-30 04:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodbook_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='comment',
            new_name='content',
        ),
        migrations.AlterField(
            model_name='review',
            name='date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
