from rest_framework import serializers
from apps.api.models import Session, Summary
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username']


class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = ['id', 'summary_type', 'total_distance', 'total_number_sessions', 'average_length_time',
                  'last_session']


class SessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Session
        fields = ['id', 'user', 'summary', 'session_type', 'intensity', 'distance', 'length_time', 'session_date']


class SummaryWithSessionsSerializer(serializers.ModelSerializer):
    sessions = SessionSerializer(many=True)

    class Meta:
        model = Summary
        fields = ['id', 'summary_type', 'total_distance', 'total_number_sessions', 'average_length_time',
                  'last_session', 'sessions']
