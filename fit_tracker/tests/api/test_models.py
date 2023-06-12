from datetime import datetime , timedelta , timezone
import pytest
from django.core.exceptions import ValidationError
from django.db import DataError, IntegrityError
from apps.api.models import Session, Summary
from django.contrib.auth import get_user_model

UserModel = get_user_model()


@pytest.fixture
def create_user_instance():
    user = UserModel.objects.create_user(email= 'test.name@test.com', username= 'test_user', password= 'password')
    return user


@pytest.mark.django_db
def test_create_user_model(create_user_instance):
    test_user = create_user_instance

    assert test_user.email == 'test.name@test.com'
    assert test_user.username == 'test_user'


@pytest.mark.django_db
def test_invalid_create_user_model(create_user_instance):
    with pytest.raises(IntegrityError):
        UserModel.objects.create_user(username = 'test_user', password = 'password')


@pytest.mark.django_db
def test_get_and_delete_user_model(create_user_instance):
    test_user = create_user_instance
    test_user.save()
    assert test_user == UserModel.objects.get(id=test_user.id)
    test_user.delete()
    with pytest.raises(UserModel.DoesNotExist):
        UserModel.objects.get(id=test_user.id)


@pytest.mark.django_db
def test_update_user_model(create_user_instance):
    test_user = create_user_instance
    test_user.email = 'new.email@new.com'
    test_user.username = 'notSoRandomString'
    test_user.save()

    test_user = UserModel.objects.get(id=test_user.id)

    assert test_user.email == 'new.email@new.com'
    assert test_user.username == 'notSoRandomString'


@pytest.fixture
def get_user_instance():
    user = UserModel.objects.get(username= 'test_user')
    return user


@pytest.fixture
def get_summary_instance(get_user_instance):
    summary_type = 'running'
    summary = Summary.objects.get(user=get_user_instance, summary_type=summary_type)
    return summary


@pytest.mark.django_db
def test_get_and_delete_summary_model(create_user_instance, get_user_instance, get_summary_instance):
    test_summary = get_summary_instance

    assert test_summary.user == get_user_instance
    assert test_summary.summary_type == 'running'

    test_summary.save()
    assert test_summary == Summary.objects.get(id=test_summary.id)
    test_summary.delete()
    with pytest.raises(Summary.DoesNotExist):
        Summary.objects.get(id=test_summary.id)


@pytest.mark.django_db
@pytest.mark.parametrize("summary_type", ['running', 'cycling', 'hiking', 'swimming', 'walking'])
def test_get_and_delete_summary_model(create_user_instance, get_user_instance, summary_type):
    test_summary = Summary.objects.get(user=get_user_instance, summary_type=summary_type)
    assert test_summary.summary_type == summary_type


@pytest.fixture
def create_summary_instance(get_user_instance):
    summary_type = 'running'
    summary = Summary.objects.create(user=get_user_instance, summary_type=summary_type)
    return summary


@pytest.mark.django_db
def test_create_summary_model(create_user_instance, get_user_instance, create_summary_instance):
    test_summary = create_summary_instance

    assert test_summary.summary_type == 'running'
    assert test_summary.user == get_user_instance


@pytest.fixture
def create_session_instance(create_user_instance, get_user_instance, get_summary_instance):
    session_type = 'running'
    session = Session(user=get_user_instance, summary=get_summary_instance , session_type=session_type,
                      distance=10, intensity='medium', length_time='01:00:00',
                      session_date='2023-05-13T07:32:38')
    return session


@pytest.mark.django_db
def test_create_session_model(create_session_instance, get_user_instance, get_summary_instance):
    test_session = create_session_instance

    assert test_session.user == get_user_instance
    assert test_session.summary == get_summary_instance
    assert test_session.session_type == 'running'
    assert test_session.distance == 10
    assert test_session.intensity == 'medium'
    assert test_session.length_time == '01:00:00'
    assert test_session.session_date == '2023-05-13T07:32:38'


@pytest.mark.django_db
def test_wrong_type_summary_for_session_model(create_session_instance, get_user_instance):
    summary_type = 'hiking'
    summary_instance = Summary.objects.get(user=get_user_instance, summary_type=summary_type)
    session_type = 'running'
    test_session = Session(user=get_user_instance, summary=summary_instance, session_type=session_type,
                           distance=10, intensity='medium', length_time='01:00:00',
                           session_date='2023-05-13T07:32:38')
    with pytest.raises(ValidationError):
        test_session.clean()


@pytest.mark.django_db
def test_get_and_delete_session_model(create_session_instance, get_user_instance):
    test_session = create_session_instance
    test_session.save()
    assert test_session == Session.objects.get(id=test_session.id)
    test_session.delete()
    with pytest.raises(Session.DoesNotExist):
        Session.objects.get(id=test_session.id)


@pytest.mark.django_db
def test_invalid_update_session_model(create_session_instance, get_user_instance):
    test_session = create_session_instance

    test_session.session_type = 'cycling'
    test_session.distance = 'invalid'
    test_session.length_time = '99:99:99:99'

    with pytest.raises(ValidationError or DataError):
        test_session.save()


@pytest.mark.django_db
def test_update_session_model(create_session_instance, get_user_instance):
    test_session = create_session_instance
    test_session.distance = 30
    test_session.intensity = 'hard'
    test_session.length_time = '00:40:00'
    test_session.session_date = '2023-04-12 17:11:11'
    test_session.save()
    test_session = Session.objects.get(id=test_session.id)

    assert test_session.distance == 30
    assert test_session.intensity == 'hard'
    assert test_session.length_time == timedelta(seconds=2400)
    assert test_session.session_date == datetime(2023, 4, 12, 17, 11, 11, tzinfo=timezone.utc)


@pytest.mark.django_db
def test_cascade_delete_session_model(create_session_instance, get_user_instance):
    test_session = create_session_instance
    get_user_instance.delete()
    with pytest.raises(Session.DoesNotExist):
        Session.objects.get(id=test_session.id)


@pytest.mark.django_db
def test_cascade_delete_summary_model(create_user_instance, get_user_instance, get_summary_instance):
    test_summary = get_summary_instance
    get_user_instance.delete()
    with pytest.raises(Summary.DoesNotExist):
        Summary.objects.get(id=test_summary.id)
