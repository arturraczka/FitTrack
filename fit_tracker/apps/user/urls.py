from django.urls import path
from apps.user.views import UserRegister, UserLogin, UserLogout, UserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('', UserView.as_view(), name = 'user'),
    path('register/', UserRegister.as_view(), name = 'register'),
    path('login/', UserLogin.as_view(), name = 'login'),
    path('logout/', UserLogout.as_view(), name = 'logout'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
