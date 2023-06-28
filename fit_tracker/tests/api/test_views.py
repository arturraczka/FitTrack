import pytest
from datetime import timedelta
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.api.models import Session, Summary
from apps.api.serializers import SessionSerializer

User = get_user_model()


@pytest.mark.django_db
def test_summary_list_view():
    user = User.objects.create_user(username='testuser', password='testpass')

    client = APIClient()
    client.force_authenticate(user=user)

    url = reverse('summary-list')
    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 5


@pytest.mark.django_db
@pytest.mark.parametrize('summary_type', ['running', 'cycling', 'hiking', 'walking', 'swimming'])
def test_summary_with_session_list_view(summary_type):
    user = User.objects.create_user(username='testuser', password='testpass')
    summary = Summary.objects.get(user=user, summary_type=summary_type)
    Session.objects.create(user=user, summary=summary, session_type=summary_type, intensity='hard',
                           distance=51.0, length_time=timedelta(hours=2, minutes=30),
                           session_date='2023-04-10T07:32:38')
    Session.objects.create(user=user, summary=summary, session_type=summary_type, intensity='hard',
                           distance=20.0, length_time=timedelta(hours=1, minutes=30),
                           session_date='2023-05-13T07:32:38')

    client = APIClient()
    client.force_authenticate(user=user)

    response = client.get(f'/api/summary/{summary_type}/')

    expected_data = {
        'id': summary.id,
        'summary_type': str(summary_type),
        'total_distance': str(71.0),
        'total_number_sessions': 2,
        'average_length_time': '02:00:00',
        'last_session': '2023-05-13T07:32:38Z',
    }

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data['sessions']) == 2
    for key in expected_data.keys():
        assert response.data[key] == expected_data[key]


@pytest.mark.django_db
def test_session_view_list_get():
    summary_type = 'swimming'
    user = User.objects.create_user(username = 'testuser' , password = 'testpass')
    summary = Summary.objects.get(user = user , summary_type = summary_type)
    session = Session.objects.create(user = user , summary = summary , session_type = summary_type , intensity = 'hard' ,
                           distance = 51.0 , length_time = timedelta(hours = 2 , minutes = 30) ,
                           session_date = '2023-04-10T07:32:38')

    client = APIClient()
    client.force_authenticate(user=user)

    expected_data = {
        "id": session.id,
        "user": user.id,
        "summary": summary.id,
        "session_type": "swimming",
        "intensity": "hard",
        "distance": "51.0",
        "length_time": "02:30:00",
        "session_date": "2023-04-10T07:32:38Z"
    }

    response = client.get('/api/session/')

    assert response.status_code == status.HTTP_200_OK
    assert dict(response.data[0]) == expected_data


@pytest.mark.django_db
def test_session_view_post():
    summary_type = 'swimming'
    user = User.objects.create_user(username = 'testuser' , password = 'testpass')
    summary = Summary.objects.get(user = user , summary_type = summary_type)

    session_data = {
        "user": user.id,
        "summary": summary.id,
        "session_type": summary_type,
        "intensity": 'hard',
        "distance": '20.3',
        "length_time": "02:30:00",
        "session_date": '2023-04-10T07:32:38Z',
    }

    client = APIClient()
    client.force_authenticate(user=user)

    response = client.post('/api/session/', session_data)
    session = Session.objects.first()
    serializer = SessionSerializer(session)
    session_data['id'] = session.id

    assert response.status_code == status.HTTP_201_CREATED
    assert Session.objects.count() == 1
    assert serializer.data == session_data


@pytest.mark.django_db
def test_session_view_get():
    summary_type = 'walking'
    user = User.objects.create_user(username = 'testuser' , password = 'testpass')
    summary = Summary.objects.get(user = user , summary_type = summary_type)
    session = Session.objects.create(user = user , summary = summary , session_type = summary_type , intensity = 'easy',
                                     distance = 25.0 , length_time = timedelta(hours = 1 , minutes = 30) ,
                                     session_date = '2023-04-10T07:32:38')

    client = APIClient()
    client.force_authenticate(user=user)
    response = client.get(f'/api/session/{session.id}/')

    expected_data = {
        "id": session.id,
        "user": user.id,
        "summary": summary.id,
        "session_type": "walking",
        "intensity": "easy",
        "distance": "25.0",
        "length_time": "01:30:00",
        "session_date": "2023-04-10T07:32:38Z"
    }

    assert response.status_code == status.HTTP_200_OK
    assert response.data == expected_data


@pytest.mark.django_db
def test_session_view_delete():
    summary_type = 'walking'
    user = User.objects.create_user(username='testuser', password='testpass')
    summary = Summary.objects.get(user=user, summary_type=summary_type)
    session = Session.objects.create(
        user=user,
        summary=summary,
        session_type=summary_type,
        intensity='easy',
        distance=25.0,
        length_time=timedelta(hours=1, minutes=30),
        session_date='2023-04-10T07:32:38'
    )

    client = APIClient()
    client.force_authenticate(user=user)
    response = client.delete(f'/api/session/{session.id}/')

    assert response.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_session_view_put():
    summary_type = 'walking'
    user = User.objects.create_user(username='testuser', password='testpass')
    summary = Summary.objects.get(user=user, summary_type=summary_type)
    session = Session.objects.create(user=user, summary=summary, session_type=summary_type, intensity='easy',
                                     distance=25.0, length_time=timedelta(hours=1, minutes=30),
                                     session_date='2023-04-10T07:32:38')

    client = APIClient()
    client.force_authenticate(user=user)

    new_data = {
        "user": user.id,
        "session_type": str(summary_type),
        "intensity": "hard",
        "distance": "30.0",
        "length_time": "02:00:00",
        "session_date": "2023-06-27T09:48:11Z"
    }

    response = client.put(f'/api/session/{session.id}/', data=new_data, format='json')

    session.refresh_from_db()

    expected_data = {
        "id": session.id,
        "user": user.id,
        "summary": summary.id,
        "session_type": str(summary_type),
        "intensity": "hard",
        "distance": "30.0",
        "length_time": "02:00:00",
        "session_date": "2023-06-27T09:48:11Z"
    }

    assert response.status_code == status.HTTP_200_OK
    assert response.data == expected_data


# TODO
#  refactoring z fixtures
#  testowanie validacji
#  testowanie niekompletnych POSTów/UPDATEów
#  testowanie niedozwolonych metod?
#  testowanie routingu?
#  zrobienie lintingu z blackiem
#  test UserRegister view
#  test UserView view
#  test ChangePasswordView view
#  ewentualnie UserRegisterSerializer
#  ewentualnie ChangePasswordSerializer
