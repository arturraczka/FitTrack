from django.urls import path , include
from apps.api.views import SummaryListView, SummaryWithSessionListView, SessionViewSet
from rest_framework import routers

session_router = routers.DefaultRouter()
session_router.register(r'session', SessionViewSet)

urlpatterns = [
    path('', include(session_router.urls)),
    path('summary', SummaryListView.as_view(), name = 'summary'),
    path('summary/<str:summary_type>/', SummaryWithSessionListView.as_view(), name = 'summary-type'),
    path('user/', include('apps.user.urls')),
]
