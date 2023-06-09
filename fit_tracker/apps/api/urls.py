from django.urls import path, include


from apps.api.views import RunningSessionListCreateAPIView , CyclingSessionListCreateAPIView , \
    HikingSessionListCreateAPIView , \
    SwimmingSessionListCreateAPIView , WalkingSessionListCreateAPIView , \
    SummaryListSessionCreateAPIView

urlpatterns = [
    path('running/', RunningSessionListCreateAPIView.as_view(), ),
    path('cycling/', CyclingSessionListCreateAPIView.as_view(), ),
    path('hiking/', HikingSessionListCreateAPIView.as_view(), ),
    path('swimming/', SwimmingSessionListCreateAPIView.as_view(), ),
    path('walking/', WalkingSessionListCreateAPIView.as_view(), ),
    path('', SummaryListSessionCreateAPIView.as_view(), name = 'activities'),
]