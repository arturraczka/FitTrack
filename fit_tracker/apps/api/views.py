from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView
from apps.api.models import Session
from apps.api.serializers import SessionSerializer


class SessionListAPIView(ListCreateAPIView):
    queryset = Session.objects.none()
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]


class RunningSessionListAPIView(SessionListAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='running').order_by('-start_date')
        return queryset


class CyclingSessionListAPIView(SessionListAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='cycling').order_by('-start_date')
        return queryset


class HikingSessionListAPIView(SessionListAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='hiking').order_by('-start_date')
        return queryset


class SwimmingSessionListAPIView(SessionListAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='swimming').order_by('-start_date')
        return queryset


class WalkingSessionListAPIView(SessionListAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='walking').order_by('-start_date')
        return queryset
