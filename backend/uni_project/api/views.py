from django.contrib.postgres.search import TrigramSimilarity
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Count
from django.shortcuts import render
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication, BaseAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from twisted.names.client import query

from chat.models import Question
from .serializers import *
from .services.auth_service import get_tokens_for_user

from account.models import User


class RegisterApiView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        tokens = get_tokens_for_user(user)
        return Response({
            "access": tokens["access"],
            "refresh": tokens["refresh"],
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        }, status=status.HTTP_200_OK)

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserListSerializer

class QuestionCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    queryset = Question.objects.all()
    serializer_class = QuestionCreateSerializer

class QuestionListAPIView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Question.objects.annotate(message_count=Count("chat__messages"))
    serializer_class = QuestionListSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        count = int(self.request.GET.get("count"))
        order_by = self.request.GET.get("order_by")
        category_slug = self.request.GET.get("category")
        user_query = self.request.GET.get("query")
        print("query: ", user_query)
        if user_query != "":

            queryset1 = queryset.annotate(similarity=TrigramSimilarity("title", user_query))
            queryset2 = queryset.annotate(similarity=TrigramSimilarity("description", user_query))
            queryset = (queryset1.filter(similarity__gt=0.1) | queryset2.filter(similarity__gt=0.1)).order_by("-similarity")
        if category_slug:
            category = Category.objects.get(slug=category_slug)
            queryset = queryset.filter(category=category)

        if not order_by or order_by=="newest":
            queryset = queryset.order_by("-created_at")
        elif order_by=="most-answered":
            queryset = queryset.order_by("-message_count")
        elif order_by=="not-answered":
            queryset = queryset.order_by("message_count")

        page = self.request.GET.get("page")
        q_per_page = 10
        paginator = Paginator(queryset, q_per_page)
        try:
            page = paginator.page(page)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)
        if count==0:
            return page
        return page[:count]

class CategoryListAPIView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ChatAPIView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
