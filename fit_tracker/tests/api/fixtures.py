from datetime import timedelta

import pytest
from apps.api.models import Session, Summary
from django.contrib.auth import get_user_model

UserModel = get_user_model()


@pytest.fixture
def create_user_instance():
    user = UserModel.objects.create_user(email= 'test.name@test.com', username= 'test_user', password= 'password')
    return user


@pytest.fixture
def get_user_instance():
    user = UserModel.objects.get(username= 'test_user')
    return user


@pytest.fixture
def get_summary_instance(get_user_instance):
    summary_type = 'running'
    summary = Summary.objects.get(user=get_user_instance, summary_type=summary_type)
    return summary


@pytest.fixture
def create_summary_instance(get_user_instance):
    summary_type = 'running'
    summary = Summary.objects.create(user=get_user_instance, summary_type=summary_type)
    return summary


@pytest.fixture
def create_session_instance(create_user_instance, get_user_instance, get_summary_instance):
    session_type = 'running'
    session = Session(user=get_user_instance, summary=get_summary_instance , session_type=session_type,
                      distance=10.0, intensity='medium', length_time=timedelta(hours=1, minutes=30),
                      session_date='2023-05-13T07:32:38')
    return session


def duration_converter(duration_input):
    duration = duration_input
    hours = duration.seconds // 3600
    minutes = (duration.seconds // 60) % 60
    seconds = duration.seconds % 60

    string_duration = '{:02d}:{:02d}:{:02d}'.format(hours, minutes, seconds)
    return string_duration
