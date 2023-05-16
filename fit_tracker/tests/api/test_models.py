import pytest
from apps.api.models import Session
from django.contrib.auth import get_user_model
from datetime import datetime

from apps.api.serializers import SessionSerializer

User = get_user_model()


@pytest.mark.django_db
def test_session_model():
    user = User.objects.create(username='testuser', password='testpass')
    test_session = Session(user=user, session_type='running', distance=10, intensity='medium', length_time='01:00:00', start_date='2023-05-13T07:32:38')
    test_session.save()
    # assert test_session.user.username == 'testuser'
    assert test_session.session_type == 'running'
    assert test_session.distance == 10
    assert test_session.intensity == 'medium'
    assert test_session.length_time == '01:00:00'
    assert test_session.start_date == '2023-05-13T07:32:38'


@pytest.fixture
def valid_session_data():
    return {
        'session_type': 'running',
        'distance': 10,
        'intensity': 'High',
        'length_time': 60,
        'start_date': datetime.now().isoformat(),
    }


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
        'start_date': '2023-05-01T10:00:00',
    }


def test_session_serializer_valid(valid_session_data):
    serializer = SessionSerializer(data=valid_session_data)
    assert serializer.is_valid() is True
    assert serializer.errors == {}


def test_session_serializer_invalid(invalid_session_data):
    serializer = SessionSerializer(data=invalid_session_data)
    assert serializer.is_valid() is False
    assert 'length_time' in serializer.errors
