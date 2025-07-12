from django.contrib import admin
from .models import *

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "title", "created_at", "category", "is_active"]
    list_editable = ["is_active"]

class MessageInline(admin.TabularInline):
    model = Message
    extra = 1

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ["id", "question", "is_active"]
    inlines = [MessageInline]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "created_at"]