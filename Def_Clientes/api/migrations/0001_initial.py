# Generated by Django 5.1.1 on 2024-10-08 05:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('number', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('address', models.TextField()),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('currency_name', models.CharField(max_length=100)),
                ('currency_code', models.CharField(max_length=100)),
                ('currency_symbol', models.CharField(max_length=100)),
                ('exchange_rate', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='ClientAccounts',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('account_name', models.CharField(max_length=100)),
                ('account_number', models.CharField(max_length=100, unique=True)),
                ('balance', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cliente')),
                ('currency', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.currency')),
            ],
        ),
    ]