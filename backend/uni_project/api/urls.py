from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

app_name = "api"
urlpatterns = [
    path("users/", views.UserListView.as_view(), name="users_list"),
    path("user/<pk>", views.UserDetailView.as_view(), name="user_by_id"),
    path("users/register/", views.RegisterApiView.as_view(), name="register"),
    path("users/login/", views.LoginAPIView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("questions/create/", views.QuestionCreateAPIView.as_view(), name="question_create"),
    path("questions/", views.QuestionListAPIView.as_view(), name="questions_list"),
    path("categories/", views.CategoryListAPIView.as_view(), name="categories_list"),
    path("chat/<pk>", views.ChatAPIView.as_view(), name="chat_by_id"),
    # path("messages/create/", views.MessageCreateAPIView.as_view(), name="chats_list"),

]