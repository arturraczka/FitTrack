from django.urls import path, include

from apps.api.views import RunningSessionListAPIView

urlpatterns = [
    path('', RunningSessionListAPIView.as_view(),)
]
