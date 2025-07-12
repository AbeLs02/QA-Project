from rest_framework import serializers
from taggit.models import Tag

from account.models import User
from django.contrib.auth import authenticate
from chat.models import Question, Chat, Category, Message


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create(username=validated_data["username"],
                                   email=validated_data["email"],
                                   )
        user.set_password(validated_data["password"])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)

            if not user:
                raise serializers.ValidationError("ورود نامعتبر. لطفاً اطلاعات را بررسی کنید.", code="authorization")

        else:
            raise serializers.ValidationError("ایمیل و رمز عبور الزامی هستند.", code="authorization")
        print(f"logged in as: {user.username}")
        attrs["user"] = user
        return attrs

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username", "email", "phone", "first_name", "last_name",
                  "profile", "career", "date_joined"]


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "phone", "first_name", "last_name",
                  "career", "date_joined"]



class QuestionCreateSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), write_only=True)
    category = serializers.CharField()
    chat_id = serializers.SerializerMethodField()
    class Meta:
        model = Question
        fields = ["title", "category", "tags", "description", "chat_id"]

    def get_chat_id(self, obj):
        try:
            return obj.chat.id
        except Chat.DoesNotExist:
            return None

    def create(self, validated_data):
        user = self.context['request'].user
        tags = validated_data.pop("tags", [])
        category_slug = validated_data.pop("category", None)
        try:
            category = Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            raise serializers.ValidationError({"category": "دسته‌بندی یافت نشد."})

        question = Question.objects.create(user=user, category=category, **validated_data)
        question.tags.set(tags)
        Chat.objects.create(question=question)
        return question

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class QuestionListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    chat_id = serializers.SerializerMethodField()
    message_count = serializers.IntegerField()
    class Meta:
        model = Question
        fields = ["id", "user", "title", "category", "tags", "description", "created_at", "chat_id", "message_count"]

    def get_chat_id(self, obj):
        try:
            return obj.chat.id
        except Chat.DoesNotExist:
            return None

    def get_message_count(self, obj):
        return obj.chat.messages.count()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]

class QuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Question
        fields = ["id", "user", "title", "description", "category", "tags"]

class MessageListSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    class Meta:
        model = Message
        fields = ["id", "chat", "sender", "message", "sent_at"]

class ChatSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(read_only=True)
    messages = MessageListSerializer(many=True, read_only=True)
    class Meta:
        model = Chat
        fields = ["id", "question", "messages"]
