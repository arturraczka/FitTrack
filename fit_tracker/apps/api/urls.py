from django.urls import path, include
from apps.api.views import SummaryListSessionCreateAPIView, TypeSessionListCreateAPIView

urlpatterns = [
    path('', SummaryListSessionCreateAPIView.as_view(), name = 'activities'),
    path('<str:session_type>/', TypeSessionListCreateAPIView.as_view({'get': 'retrieve', 'post': 'create',
                                                                      'delete': 'destroy'}), name='my-api'),
]