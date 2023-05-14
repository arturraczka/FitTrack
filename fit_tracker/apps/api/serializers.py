from rest_framework import serializers

from apps.api.models import RunningSession


class RunningSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RunningSession
        fields = ['distance', 'intensity', 'length_time', 'start_date']
