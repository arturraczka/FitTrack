from django.urls import path, include
from apps.user.views import UserRegister, UserLogin, UserLogout, UserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('register/', UserRegister.as_view(), name = 'login'),
    path('login/', UserLogin.as_view(), name = 'login'),
    path('logout/', UserLogout.as_view(), name = 'login'),
    path('user/', UserView.as_view(), name = 'login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
