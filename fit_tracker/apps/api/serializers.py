from rest_framework import serializers

from apps.api.models import Session


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['session_type', 'distance', 'intensity', 'length_time', 'start_date']
