from rest_framework import serializers
from apps.api.models import Session, Summary
from datetime import timedelta
from datetime import datetime
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username']


class DateTimeFieldSerializer(serializers.Field):
    format = '%Y-%m-%d %H:%M'

    def to_representation(self, value):
        if value:
            return value.strftime(self.format)
        return None

    def to_internal_value(self, data):
        if data:
            try:
                return datetime.strptime(data, self.format)
            except ValueError:
                raise serializers.ValidationError("Invalid datetime format. Expected format: 'YYYY-MM-DD HH:MM'")
        return None


class DurationFieldSerializer(serializers.Field):
    def to_representation(self, value):
        hours, minutes, seconds = value.total_seconds() // 3600, (value.total_seconds() // 60) % 60, \
                                  value.total_seconds() % 60
        return f'{int(hours):02d}:{int(minutes):02d}:{int(seconds):02d}'

    def to_internal_value(self, data):
        parts = data.split(':')
        hours, minutes, seconds = int(parts[0]), int(parts[1]), int(parts[2])
        return timedelta(hours=hours, minutes=minutes, seconds=seconds)


class SummarySerializer(serializers.ModelSerializer):
    average_length_time = DurationFieldSerializer()
    last_session = DateTimeFieldSerializer()
    user = UserSerializer()

    class Meta:
        model = Summary
        fields = ['id', 'user', 'summary_type', 'total_distance', 'total_number_sessions', 'average_length_time',
                  'last_session']


class SessionSerializer(serializers.ModelSerializer):
    length_time = DurationFieldSerializer()
    session_date = DateTimeFieldSerializer()
    summary = SummarySerializer()
    user = UserSerializer()

    class Meta:
        model = Session
        fields = ['id', 'user', 'summary', 'session_type', 'intensity', 'distance', 'length_time', 'session_date']

    def validate(self, data):
        session_user_instance = data.get('user')
        summary_user_instance = data.get('summary').user
        if session_user_instance != summary_user_instance:
            raise serializers.ValidationError(f"Summary's user instance and Session's user instance must be the same!")

        session_type_value = data.get('session_type')
        summary_type_value = data.get('summary').summary_type
        for activity in ['running', 'cycling', 'hiking', 'swimming', 'walking']:
            if session_type_value == activity and summary_type_value != activity:
                raise serializers.ValidationError(f"Summary type must be {activity} for sessions with type {activity}!")

        return data
