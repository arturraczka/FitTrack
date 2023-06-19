from django.db.models import QuerySet
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.viewsets import ModelViewSet
from apps.api.models import Session, Summary
from apps.api.serializers import SessionSerializer, SummarySerializer, SummaryWithSessionsSerializer


class SummaryListView(ListAPIView):
    queryset = Summary.objects.none()
    serializer_class = SummarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Summary.objects.filter(user=self.request.user)
        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset


class SummaryWithSessionListView(RetrieveAPIView):
    queryset = Summary.objects.none()
    serializer_class = SummaryWithSessionsSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'summary_type'

    def get_queryset(self):
        queryset = Summary.objects.filter(user=self.request.user)
        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset


class SessionViewSet(ModelViewSet):
    queryset = Session.objects.none()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SessionSerializer

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user)
        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
