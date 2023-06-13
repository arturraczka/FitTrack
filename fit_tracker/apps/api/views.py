from rest_framework import permissions, status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from apps.api.models import Session, Summary
from apps.api.serializers import SessionSerializer, SummarySerializer
from rest_framework.response import Response


class SummaryListSessionCreateAPIView(ListCreateAPIView):
    queryset = Summary.objects.none()
    serializer_class = SummarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Summary.objects.filter(user=self.request.user)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.new_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def new_serializer(self, *args, **kwargs):
        serializer_class = SessionSerializer
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)


class SessionListCreateAPIView(ListCreateAPIView, RetrieveUpdateDestroyAPIView):
    queryset = Session.objects.none()
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]


class RunningSessionListCreateAPIView(SessionListCreateAPIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.session_type = 'running'

    def get_queryset(self):
        queryset = Session.objects.filter(user=self.request.user, session_type=self.session_type).order_by('-session_date')
        return queryset

    # def get_serializer_context(self):
    #     context = super().get_serializer_context()
    #     # Add additional context data here
    #     context['additional_data'] = 'Extra context data'
    #     return context


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
