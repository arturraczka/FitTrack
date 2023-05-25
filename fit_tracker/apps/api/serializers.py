from rest_framework import serializers

from apps.api.models import Session, Summary


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['id', 'user', 'summary', 'session_type', 'intensity', 'distance', 'length_time', 'session_date']

    def validate(self, data):
        session_type_value = data.get('session_type')
        summary = data.get('summary')

        for activity in ['running' , 'cycling' , 'hiking' , 'swimming' , 'walking']:
            if session_type_value == activity and summary.summary_type != activity:
                raise serializers.ValidationError(f"Summary type must be {activity} for sessions with type {activity}")

        return data


class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = ['id', 'summary_type' , 'total_distance' , 'total_number_sessions' , 'average_length_time' ,
                  'last_session']