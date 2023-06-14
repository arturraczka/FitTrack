from rest_framework import permissions, status
from rest_framework.generics import ListCreateAPIView
from rest_framework.viewsets import ModelViewSet

from apps.api.models import Session, Summary
from apps.api.serializers import SessionSerializer, SummarySerializer, SummaryWithSessionsSerializer
from rest_framework.response import Response


class SummaryListSessionCreateAPIView(ListCreateAPIView):  # DO GRUBEJ PRZERÓBKI na ModelViewSet
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


class TypeSessionListCreateAPIView(ModelViewSet):
    queryset = Session.objects.none()
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def list(self, request, *args, **kwargs):
    #     session_type = kwargs.get('session_type')
    #     queryset = Session.objects.filter(user=self.request.user, session_type=session_type).order_by('-session_date')
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = SessionListSerializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #
    #     serializer = SessionListSerializer(queryset, many=True)
    #     return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        summary_type = kwargs.get('session_type')
        summary_instance = Summary.objects.get(user=self.request.user, summary_type=summary_type)
        serializer = SummaryWithSessionsSerializer(summary_instance)
        return Response(serializer.data)

    # def retrieve_summary_list_session(self, request, *args, **kwargs):
    #     session_type = kwargs.get('session_type')
    #
    #     sessions_queryset = Session.objects.filter(user=self.request.user, session_type=session_type).order_by('-session_date')
    #     summary_queryset = Summary.objects.get(user=self.request.user, summary_type=session_type)
    #
    #     serializer = SummaryWithSessionsSerializer(
    #         context = {'summary_queryset': summary_queryset, 'sessions_queryset': sessions_queryset})
    #
    #     return Response(serializer.data)


#
# class SessionListCreateAPIView(ListCreateAPIView, RetrieveUpdateDestroyAPIView):
#     queryset = Session.objects.none()
#     serializer_class = SessionSerializer
#     permission_classes = [permissions.IsAuthenticated]
#
#     def get_queryset(self):
#         queryset = Session.objects.filter(user=self.request.user, session_type=self.session_type).order_by('-session_date')
#         return queryset
#
#
# class RunningSessionListCreateAPIView(SessionListCreateAPIView):
#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)
#         self.session_type = 'running'
#
#     def get_queryset(self):
#         queryset = Session.objects.filter(user=self.request.user, session_type=self.session_type).order_by('-session_date')
#         return queryset
#
#     # def get_serializer_context(self):
#     #     context = super().get_serializer_context()
#     #     # Add additional context data here
#     #     context['additional_data'] = 'Extra context data'
#     #     return context
#
#
# class CyclingSessionListCreateAPIView(SessionListCreateAPIView):
#
#     def get_queryset(self):
#         queryset = Session.objects.filter(user=self.request.user, session_type='cycling').order_by('-session_date')
#         return queryset
#
#
# class HikingSessionListCreateAPIView(SessionListCreateAPIView):
#
#     def get_queryset(self):
#         queryset = Session.objects.filter(user=self.request.user, session_type='hiking').order_by('-session_date')
#         return queryset
#
#
# class SwimmingSessionListCreateAPIView(SessionListCreateAPIView):
#
#     def get_queryset(self):
#         queryset = Session.objects.filter(user=self.request.user, session_type='swimming').order_by('-session_date')
#         return queryset
#
#
# class WalkingSessionListCreateAPIView(SessionListCreateAPIView):
#
#     def get_queryset(self):
#         queryset = Session.objects.filter(user=self.request.user, session_type='walking').order_by('-session_date')
#         return queryset
