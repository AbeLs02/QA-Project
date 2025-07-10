from rest_framework import serializers
from taggit.models import Tag

from account.models import User
from django.contrib.auth import authenticate
from chat.models import Question, Chat



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
    class Meta:
        model = Question
        fields = ["title", "category", "tags", "description"]

    def create(self, validated_data):
        user = self.context['request'].user
        tags = validated_data.pop("tags", [])
        question = Question.objects.create(user=user, **validated_data)
        question.tags.set(tags)
        Chat.objects.create(question=question)
        return question
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"
class QuestionListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ["title", "category", "tags", "description"]