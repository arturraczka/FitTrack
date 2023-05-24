from rest_framework import routers

from apps.api.views import RunningSessionListCreateAPIView

router = routers.DefaultRouter()

router.register(r'running' , RunningSessionListCreateAPIView)
