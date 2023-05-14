from django.shortcuts import render

from rest_framework.generics import ListAPIView

from apps.api.models import RunningSession
from apps.api.serializers import RunningSessionSerializer


class RunningSessionListAPIView(ListAPIView):
    queryset = RunningSession.objects.all()
    serializer_class = RunningSessionSerializer
