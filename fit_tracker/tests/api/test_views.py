from django.contrib.auth import get_user_model
import pytest
from apps.api.models import Session
from django.test import Client
from rest_framework.reverse import reverse
from rest_framework import status


User = get_user_model()


@pytest.fixture
def create_session_instance():
    def _create_instance(**kwargs):
        instance = Session.objects.create(**kwargs)
        return instance

    return _create_instance


@pytest.fixture
def client():
    return Client()


@pytest.fixture
def authenticated_user(client):
    user = User.objects.create_user(username='test_user', password='password')
    client.login(username='test_user', password='password')
    return user


@pytest.fixture
def not_authenticated_user(client):
    return User.objects.create_user(username='test_nauser', password='napassword')


@pytest.mark.django_db
def test_add_session(client, authenticated_user):
    session = Session.objects.all()
    assert len(session) == 0

    resp = client.post(
        "/my-activities/running/",
        {
            "user": authenticated_user.id,
            "summary": 1,
            "session_type": "running",
            "intensity": "hard",
            "distance": "100.0",
            "length_time": "00:01:00" ,
            "session_date": "2023-05-15T11:15:34Z" ,
        },
        content_type="application/json"
    )
    assert resp.status_code == 201
    assert resp.data["session_date"] == "2023-05-15T11:15:34Z"

    session = Session.objects.all()
    assert len(session) == 1


@pytest.mark.django_db
def test_add_session_not_authenticated_user(client, not_authenticated_user):
    session = Session.objects.all()
    assert len(session) == 0

    resp = client.post(
        "/my-activities/running/",
        {
            "user": not_authenticated_user.id,
            "summary": 4,
            "session_type": "running",
            "intensity": "hard",
            "distance": "100.0",
            "length_time": "00:01:00" ,
            "session_date": "2023-05-15T11:15:34Z" ,
        },
        content_type="application/json"
    )
    assert resp.status_code == 403

    session = Session.objects.all()
    assert len(session) == 0


@pytest.mark.django_db
def test_add_session_replaced_user(client, authenticated_user, not_authenticated_user):
    session = Session.objects.all()
    assert len(session) == 0

    resp = client.post(
        "/my-activities/running/",
        {
            "user": not_authenticated_user.id,
            "summary": 7,
            "session_type": "running",
            "intensity": "hard",
            "distance": "100.0",
            "length_time": "00:01:00" ,
            "session_date": "2023-05-15T11:15:34Z" ,
        },
        content_type="application/json"
    )
    assert resp.status_code == 400

    session = Session.objects.all()
    assert len(session) == 0


# @pytest.mark.django_db
# def test_delete_session(client, authenticated_user):
#     session = Session.objects.all()
#     assert len(session) == 0
#
#     resp = client.post(
#         "/my-activities/running/",
#         {
#             "user": authenticated_user.id,
#             "session_type": "running",
#             "distance": "100.0",
#             "intensity": "hard",
#             "length_time": "00:01:00" ,
#             "start_date": "2023-05-15T11:15:34Z" ,
#         },
#         content_type="application/json"
#     )
#     assert resp.status_code == 201
#     assert resp.data["start_date"] == "2023-05-15T11:15:34Z"
#
#     session = Session.objects.all()
#     assert len(session) == 1


# @pytest.mark.django_db
# def test_delete_instance(api_client, create_session_instance):
#     instance = create_session_instance(user=99, session_type="running", distance=50, intensity='hard',
#                                        length_time="00:01:00", start_date="2023-05-15T11:15:34Z")
#
#     url = reverse('your-model-detail', kwargs={'pk': instance.pk})  # Replace 'your-model-detail' with your actual URL name
#     response = api_client.delete(url)
#
#     assert response.status_code == status.HTTP_204_NO_CONTENT
#     assert not YourModel.objects.filter(pk=instance.pk).exists()