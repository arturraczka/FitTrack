import pytest

from apps.api.models import RunningSession

from apps.user.models import CustomUser


@pytest.mark.django_db
def test_runningsession_model():
    artur = CustomUser.objects.get(username='artur')
    session = RunningSession(user=artur, distance=10, intensity='medium', length_time=60, start_date='2023-05-16 07:32:38', calories_burnt=600)
    session.save()
    assert session.user == 'artur'
    assert session.distance == 10
    assert session.intensity == 'medium'
    assert session.length_time == 60
    assert session.start_date == '2023-05-16 07:32:38'


# def test_hello_world():
#     assert "hello_world" == "hello_world"
#     assert "foo" != "bar"