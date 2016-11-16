# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-09 02:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20161107_0311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendee',
            name='team_captain',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team_captain', to='api.Volunteer'),
        ),
    ]