# Generated by Django 5.1.6 on 2025-02-13 22:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='content',
            new_name='comment',
        ),
        migrations.RemoveField(
            model_name='review',
            name='title',
        ),
    ]
