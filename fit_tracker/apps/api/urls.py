from django.urls import path, include


from apps.api.views import RunningSessionListAPIView , CyclingSessionListAPIView , HikingSessionListAPIView , \
    SwimmingSessionListAPIView , WalkingSessionListAPIView

urlpatterns = [
    path('running/' , RunningSessionListAPIView.as_view() , ),
    path('cycling/' , CyclingSessionListAPIView.as_view() , ),
    path('hiking/' , HikingSessionListAPIView.as_view() , ),
    path('swimming/' , SwimmingSessionListAPIView.as_view() , ),
    path('walking/' , WalkingSessionListAPIView.as_view() , ),
    # path('add-workout/', )