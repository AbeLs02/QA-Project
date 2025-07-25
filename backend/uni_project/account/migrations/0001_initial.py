# Generated by Django 5.2.3 on 2025-07-08 07:19

import account.models
import django_resized.forms
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=100, unique=True, verbose_name='نام کاربری')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='ایمیل')),
                ('phone', models.CharField(blank=True, max_length=11, null=True, unique=True, verbose_name='شماره تلفن')),
                ('first_name', models.CharField(max_length=255, verbose_name='نام')),
                ('last_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='نام خانوادگی')),
                ('profile', django_resized.forms.ResizedImageField(blank=True, crop=['middle', 'center'], force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[100, 100], upload_to=account.models.User.upload_to, verbose_name='پروفایل')),
                ('career', models.CharField(choices=[('student', 'دانشجو'), ('teacher', 'استاد'), ('staff', 'کارمند'), ('regular', 'کاربر عادی')], default='regular', max_length=20, verbose_name='سمت')),
                ('is_active', models.BooleanField(default=True, verbose_name='فعال')),
                ('is_staff', models.BooleanField(default=False, verbose_name='کارمند')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='سوپریوزر')),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'ordering': ('date_joined',),
                'indexes': [models.Index(fields=['date_joined'], name='account_use_date_jo_403b71_idx')],
            },
        ),
    ]
