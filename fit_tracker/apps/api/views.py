from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView , ListAPIView
from apps.api.models import Session, Summary
from apps.api.serializers import SessionSerializer, SummarySerializer


class SummaryListAPIView(ListAPIView):
    queryset = Summary.objects.none()
    serializer_class = SummarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Summary.objects.filter(user=self.request.user)
        return queryset


class SessionListCreateAPIView(ListCreateAPIView):
    queryset = Session.objects.none()
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]


class RunningSessionListCreateAPIView(SessionListCreateAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='running').order_by('-session_date')
        return queryset


class CyclingSessionListCreateAPIView(SessionListCreateAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='cycling').order_by('-session_date')
        return queryset


class HikingSessionListCreateAPIView(SessionListCreateAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='hiking').order_by('-session_date')
        return queryset


class SwimmingSessionListCreateAPIView(SessionListCreateAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='swimming').order_by('-session_date')
        return queryset


class WalkingSessionListCreateAPIView(SessionListCreateAPIView):

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type='walking').order_by('-session_date')
        return queryset
