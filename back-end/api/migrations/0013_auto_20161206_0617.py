# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-06 06:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20161206_0547'),
    ]

    operations = [
        migrations.RenameField(
            model_name='team_captain',
            old_name='user_object',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='team_captain',
            old_name='volunteer_object',
            new_name='volunteer',
        ),
        migrations.AlterField(
            model_name='team_captain',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_object', to='api.Event'),
        ),
    ]
