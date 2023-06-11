from django.urls import path, include
from apps.user.views import UserRegister, UserLogin, UserLogout, UserView

urlpatterns = [
    path('register/', UserRegister.as_view(), name = 'login'),
    path('login/', UserLogin.as_view(), name = 'login'),
    path('logout/', UserLogout.as_view(), name = 'login'),
    path('user/', UserView.as_view(), name = 'login'),
]
