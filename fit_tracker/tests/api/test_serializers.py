import pytest
from django.contrib.auth import get_user_model
from datetime import datetime

from apps.api.serializers import SessionSerializer

User = get_user_model()


@pytest.fixture
def valid_session_data():
    return {
        'session_type': 'running',
        'distance': '10.7',
        'intensity': 'hard',
        'length_time': '60',
        'start_date': datetime.now().isoformat(),
    }


@pytest.fixture
def invalid_session_data():
    return {
        'session_type': 'cycling',
        'distance': '20.5',
        'intensity': 'medium',
        'length_time': 'InvalidDuration',
        # 'start_date': '2023-05-01T10:00:00',
    }


def test_session_serializer_valid(valid_session_data):
    serializer = SessionSerializer(data=valid_session_data)
    assert serializer.is_valid() is True
    # assert serializer.validated_data == valid_session_data
    # assert serializer.data == valid_session_data
    assert serializer.errors == {}


def test_session_serializer_invalid(invalid_session_data):
    serializer = SessionSerializer(data=invalid_session_data)
    assert serializer.is_valid() is False
    assert serializer.validated_data == {}
    assert 'length_time' in serializer.errors
    assert 'start_date' in serializer.errors

