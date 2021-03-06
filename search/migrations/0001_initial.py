# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-02 19:24
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=65, null=True)),
                ('overall_rating', models.CharField(max_length=3)),
                ('number_ratings', models.CharField(max_length=5, null=True)),
                ('culture_values_rating', models.CharField(max_length=3)),
                ('management_rating', models.CharField(max_length=3)),
                ('compensation_benefits_rating', models.CharField(max_length=3)),
                ('opportunities_rating', models.CharField(max_length=3)),
                ('work_life_balance_rating', models.CharField(max_length=3)),
                ('recommend_to_friend_rating', models.CharField(max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Glassdoor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('featured_review_title', models.CharField(max_length=100)),
                ('featured_review_text', models.TextField(max_length=1500)),
                ('number_ratings', models.CharField(max_length=5, null=True)),
                ('overall_rating', models.CharField(max_length=3)),
                ('culture_values_rating', models.CharField(max_length=3)),
                ('management_rating', models.CharField(max_length=3)),
                ('compensation_benefits_rating', models.CharField(max_length=3)),
                ('opportunities_rating', models.CharField(max_length=3)),
                ('work_life_balance_rating', models.CharField(max_length=3)),
                ('recommend_to_friend_rating', models.CharField(max_length=3)),
                ('company_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='search.Company')),
            ],
        ),
        migrations.CreateModel(
            name='Indeed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('featured_review_title', models.CharField(max_length=100)),
                ('featured_review_text', models.TextField(max_length=1500)),
                ('number_ratings', models.CharField(max_length=5, null=True)),
                ('overall_rating', models.CharField(max_length=3)),
                ('culture_values_rating', models.CharField(max_length=3)),
                ('management_rating', models.CharField(max_length=3)),
                ('compensation_benefits_rating', models.CharField(max_length=3)),
                ('opportunities_rating', models.CharField(max_length=3)),
                ('work_life_balance_rating', models.CharField(max_length=3)),
                ('company_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='search.Company')),
            ],
        ),
    ]
