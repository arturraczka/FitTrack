from rest_framework import serializers

from apps.api.models import Session, Summary


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['user', 'summary', 'session_type', 'intensity', 'distance', 'length_time', 'session_date']


class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = ['summary_type' , 'total_distance' , 'total_number_sessions' , 'average_length_time' , 'last_session']