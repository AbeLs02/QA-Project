from django.db import models
from account.models import User
from taggit.managers import TaggableManager

class Category(models.Model):
    name = models.CharField(max_length=250, unique=True, verbose_name="نام")
    slug = models.SlugField(max_length=250, unique=True, allow_unicode=True, verbose_name="اسلاگ")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ آپدیت")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['-created_at'])]
        verbose_name_plural = 'دسته بندی ها'
        verbose_name = 'دسته بندی'



class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions', verbose_name="کاربر")
    title = models.CharField(max_length=255, verbose_name="عنوان")
    description = models.TextField(verbose_name="توضیحات")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='questions', verbose_name="دسته بندی")
    tags = TaggableManager()

    is_active = models.BooleanField(default=True, verbose_name="فعال")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ آپدیت")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['-created_at'])]
        verbose_name_plural = 'سوالات'
        verbose_name = 'سوال'

class Chat(models.Model):
    question = models.OneToOneField(Question, on_delete=models.CASCADE, related_name="chat")

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.question)

    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['-created_at'])]
        verbose_name = "چت"
        verbose_name_plural = "چت ها"

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages", verbose_name="چت")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages", verbose_name="فرستنده")
    message = models.TextField(verbose_name="پیام")

    is_active = models.BooleanField(default=True)

    sent_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ارسال")

    def __str__(self):
        return self.message

    class Meta:
        ordering = ['-sent_at']
        indexes = [models.Index(fields=['-sent_at'])]