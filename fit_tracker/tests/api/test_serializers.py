import pytest
from django.contrib.auth import get_user_model
import datetime
from apps.api.models import Summary , Session
from apps.api.serializers import SessionSerializer, SummarySerializer, UserSerializer, SummaryWithSessionsSerializer


@pytest.mark.django_db
def test_user_serializer():
    valid_user_data = {
        'id': 5,
        'username': 'testusername',
    }

    serializer = UserSerializer(data=valid_user_data)
    assert serializer.is_valid()
    assert serializer.errors == {}


@pytest.mark.django_db
def test_summary_serializer():
    summary_valid_data = {
        'id': 1,
        'user': 1,
        'summary_type': 'running',
        'total_distance': 500,
        'total_number_sessions': 25,
        'average_length_time': '01:45:34',
        'last_session': '2023-05-13 07:32'
    }

    serializer = SummarySerializer(data=summary_valid_data)
    assert serializer.is_valid()
    assert serializer.errors == {}


@pytest.mark.django_db
def test_session_serializer():
    user = get_user_model().objects.create_user(username='testuser', password='testpassword')
    summary = Summary.objects.get(user=user, summary_type='running')
    session = Session.objects.create(
        user=user,
        summary=summary,
        session_type='running',
        intensity='hard',
        distance=10.5,
        length_time=datetime.timedelta(minutes=55),
        session_date='2023-05-20 09:00:00'
    )

    serializer = SessionSerializer(instance=session)
    expected_data = {
        'id': session.id,
        'user': user.id,
        'summary': summary.id,
        'session_type': 'running',
        'intensity': 'hard',
        'distance': '10.5',
        'length_time': '00:55:00',
        'session_date': '2023-05-20 09:00:00'
    }

    assert serializer.data == expected_data

