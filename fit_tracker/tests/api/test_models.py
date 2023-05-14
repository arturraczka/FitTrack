import pytest
from apps.api.models import Session
from django.contrib.auth import get_user_model

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