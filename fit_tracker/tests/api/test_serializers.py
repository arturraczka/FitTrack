import pytest
from django.contrib.auth import get_user_model
from datetime import datetime
from apps.api.models import Session , Summary
from apps.api.serializers import SessionSerializer , SummarySerializer , UserSerializer


@pytest.fixture
def get_user_instance():
    user_model = get_user_model()
    user_model.objects.create(username='fhgjhkjghfg', password='password')
    user = user_model.objects.get(username='fhgjhkjghfg')
    return user


@pytest.mark.django_db
def test_user_serializer():
    user_data = {
        'id': 1,
        'username': 'bowryjcidam',
    }

    serializer = UserSerializer(data=user_data)
    assert serializer.is_valid() is True
    assert serializer.errors == {}


@pytest.mark.django_db
def test_summary_serializer():
    summary_data = {
        'id': 1,
        'user': {
            'id': 1,
            'username': 'randstring'
        },
        'summary_type': 'running',
        'total_distance': 500,
        'total_number_sessions': 25,
        'average_length_time': '01:45:34',
        'last_session': '2023-05-13 07:32'
    }

    serializer = SummarySerializer(data=summary_data)
    assert serializer.is_valid() is True
    assert serializer.errors == {}


# @pytest.fixture
# def session_instance(summary_instance):
#     session = Session(user = 1 , summary = summary_instance , session_type = 'running' ,
#                       distance = 10 , intensity = 'medium' , length_time = '05:00:34' ,
#                       session_date = '2023-05-13 07:32')
#     return session


# @pytest.fixture
# def valid_session_data(summary_instance):
#     return {
#         'id': 1,
#         'user': 1,
#         'summary': summary_instance,
#         'session_type': 'running',
#         'distance': '10.7',
#         'intensity': 'hard',
#         'length_time': '05:00:34',
#         'session_date': '2023-05-13 07:32'
        # 'session_date': datetime.now().isoformat(),
    # }

# @pytest.fixture
# def invalid_session_data():
#     return {
#         'session_type': 'cycling',
#         'distance': '20.5',
#         'intensity': 'medium',
#         'length_time': 'InvalidDuration',
#         # 'start_date': '2023-05-01T10:00:00',
#     }

    # assert serializer.data['user'] == valid_session_data['user'].id
    # assert serializer.data['summary'] == valid_session_data['summary'].id
    # # assert serializer.validated_data == valid_session_data
    # # assert serializer.data == valid_session_data
    # assert serializer.errors == {}

# @pytest.mark.django_db
# def test_session_serializer_invalid(invalid_session_data):
#     serializer = SessionSerializer(data=invalid_session_data)
#     assert serializer.is_valid() is False
#     assert serializer.validated_data == {}
#     assert 'length_time' in serializer.errors
#     assert 'session_date' in serializer.errors
