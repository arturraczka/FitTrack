from django.contrib.auth import get_user_model
import pytest
from apps.api.models import Session
from django.test import Client


User = get_user_model()


@pytest.fixture
def client():
    return Client()


@pytest.fixture
def authenticated_user(client):
    # Create and authenticate a user
    user = User.objects.create_user(username='test_user', password='password')
    client.login(username='test_user', password='password')
    return user


@pytest.mark.django_db
def test_add_session(client, authenticated_user):
    session = Session.objects.all()
    assert len(session) == 0

    resp = client.post(
        "/my-activities/running/",
        {
            "user": authenticated_user.id,
            "session_type": "running",
            "distance": "100.0",
            "intensity": "hard",
            "length_time": "00:01:00" ,
            "start_date": "2023-05-15T11:15:34Z" ,
        },
        content_type="application/json"
    )
    assert resp.status_code == 201
    assert resp.data["start_date"] == "2023-05-15T11:15:34Z"

    session = Session.objects.all()
    assert len(session) == 1


# for now just the happy path
