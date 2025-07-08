from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django_resized import ResizedImageField

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, username, first_name=None, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, first_name=None, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name, is_superuser=True, is_staff=True)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    def upload_to(self, filename):
        return f"profiles/{self.username}/{filename}"

    CAREER_CHOICES = (
        ("student", "دانشجو"),
        ("teacher", "استاد"),
        ("staff", "کارمند"),
        ("regular", "کاربر عادی"),
    )
    username = models.CharField(max_length=100, unique=True, verbose_name="نام کاربری")
    email = models.EmailField(unique=True, verbose_name="ایمیل")
    phone = models.CharField(max_length=11, unique=True, null=True, blank=True, verbose_name="شماره تلفن")
    first_name = models.CharField(max_length=255, verbose_name="نام")
    last_name = models.CharField(max_length=255, null=True, blank=True, verbose_name="نام خانوادگی")
    profile = ResizedImageField(upload_to=upload_to, size=[100,100], crop=["middle", "center"], null=True, blank=True, verbose_name="پروفایل")
    career = models.CharField(max_length=20, choices=CAREER_CHOICES, default="regular", verbose_name="سمت")
    
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    is_staff = models.BooleanField(default=False, verbose_name="کارمند")
    is_superuser = models.BooleanField(default=False, verbose_name="سوپریوزر")

    date_joined = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ثبت نام")

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "first_name"]
    manager = UserManager()

    def __str__(self):
        return self.username
    class Meta:
        ordering = ("date_joined",)
        indexes = [models.Index(fields=["date_joined"])]