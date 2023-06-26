import pytest
from django.contrib.auth import get_user_model
from datetime import timedelta
import datetime
from apps.api.models import Summary , Session
from apps.api.serializers import SessionSerializer, SummarySerializer, UserSerializer, SummaryWithSessionsSerializer
from tests.api.fixtures import \
    create_user_instance, \
    get_user_instance, \
    get_summary_instance, \
    create_summary_instance, \
    create_session_instance, \
    duration_converter

User = get_user_model()


@pytest.mark.django_db
def test_user_serialization(create_user_instance):
    user = create_user_instance
    serializer = UserSerializer(instance=user)
    expected_data = {
        'id': user.id,
        'username': user.username,
    }
    assert serializer.data == expected_data


@pytest.mark.django_db
def test_user_deserialization():
    user_valid_data = {
        'id': 5,
        'username': 'testusername',
    }

    serializer = UserSerializer(data=user_valid_data)
    assert serializer.is_valid()
    assert serializer.errors == {}


@pytest.mark.django_db
def test_user_invalid_deserialization():
    user_invalid_data = {
        'id': 5,
    }

    serializer = UserSerializer(data=user_invalid_data)
    assert serializer.is_valid() is False


@pytest.mark.django_db
def test_summary_serialization(create_user_instance, get_summary_instance):
    summary = get_summary_instance
    serializer = SummarySerializer(instance=summary)
    expected_data = {
        'id': summary.id,
        'summary_type': summary.summary_type,
        'total_distance': summary.total_distance,
        'total_number_sessions': summary.total_number_sessions,
        'average_length_time': summary.average_length_time,
        'last_session': summary.last_session,
    }
    assert serializer.data == expected_data


@pytest.mark.django_db
def test_summary_deserialization():
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
def test_summary_invalid_deserialization():
    summary_invalid_data = {
        'id': 1,
        'user': 1,
        # 'summary_type': 'running',
        'total_distance': 500,
        'total_number_sessions': 25,
        'average_length_time': '01:45:34',
        'last_session': '2023-05-13 07:32'
    }

    serializer = SummarySerializer(data=summary_invalid_data)
    assert serializer.is_valid() is False
    assert len(serializer.errors) == 1


@pytest.mark.django_db
def test_session_serialization(create_session_instance):
    session = create_session_instance
    serializer = SessionSerializer(instance=session)

    expected_data = {
        'id': session.id,
        'user': session.user.id,
        'summary': session.summary.id,
        'session_type': session.session_type,
        'intensity': session.intensity,
        'distance': '{:.1f}'.format(session.distance),
        'length_time': duration_converter(session.length_time),
        'session_date': session.session_date,
    }

    assert serializer.data == expected_data


@pytest.mark.django_db
def test_session_deserialization(create_user_instance, create_summary_instance):
    user = create_user_instance
    summary = create_summary_instance

    session_valid_data = {
        'id': 1,
        'user': user.id,
        'summary': summary.id,
        'session_type': 'running',
        'intensity': 'hard',
        'distance': 500,
        'length_time': '01:45:34',
        'session_date': '2023-05-13 07:32'
    }

    serializer = SessionSerializer(data = session_valid_data)
    assert serializer.is_valid()
    assert serializer.errors == {}


@pytest.mark.django_db
def test_session_invalid_deserialization(create_user_instance, create_summary_instance):
    user = create_user_instance
    summary = create_summary_instance

    session_invalid_data = {
        'id': 1,
        'user': user.id,
        'summary': summary.id,
        'session_type': 'running',
        'intensity': 'hard',
        'distance': 500,
        # 'length_time': '01:45:34',
        'session_date': '2023-05-13 07:32'
    }

    serializer = SessionSerializer(data = session_invalid_data)
    assert serializer.is_valid() is False
    assert len(serializer.errors) == 1


@pytest.mark.django_db
def test_summary_with_session_serialization(create_user_instance, get_summary_instance):
    summary = get_summary_instance
    serializer = SummaryWithSessionsSerializer(instance=summary)
    expected_data = {
        'id': summary.id,
        'summary_type': summary.summary_type,
        'total_distance': summary.total_distance,
        'total_number_sessions': summary.total_number_sessions,
        'average_length_time': summary.average_length_time,
        'last_session': summary.last_session,
        'sessions': []
    }
    assert serializer.data == expected_data
