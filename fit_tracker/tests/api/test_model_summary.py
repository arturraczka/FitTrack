import pytest
from apps.api.models import Summary
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture
def user_instance():
    user = User.objects.create(username='test_user', password='password')
    return user


@pytest.mark.django_db
def test_create_summary_model(create_user_instance):
    test_summary = Summary.objects.create(user=create_user_instance , summary_type= 'running' , total_distance=50 ,
                                          total_number_sessions=5 , average_length_time='05:00:00' ,
                                          last_session='2023-05-13T07:32:38')

    assert test_summary.user == create_user_instance
    assert test_summary.summary_type == 'running'
    assert test_summary.total_distance == 50
    assert test_summary.total_number_sessions == 5
    assert test_summary.average_length_time == '05:00:00'
    assert test_summary.last_session == '2023-05-13T07:32:38'

