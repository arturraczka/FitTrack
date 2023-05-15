from rest_framework import routers

from apps.api.views import RunningSessionListAPIView

router = routers.DefaultRouter()

router.register(r'running' , RunningSessionListAPIView)
