import pytest
from django.core.exceptions import ValidationError
from apps.api.models import Session, Summary
from django.contrib.auth import get_user_model


@pytest.fixture
def user_instance():
    user_model = get_user_model()
    user = user_model.objects.create(username= 'test_user' , password= 'password')
    return user


@pytest.mark.django_db
def test_create_session_model(create_user_instance):
    session_type = 'running'
    summary_instance = Summary.objects.get(user=create_user_instance , summary_type=session_type)
    test_session = Session(user=create_user_instance , summary=summary_instance , session_type=session_type ,
                           distance=10 , intensity='medium' , length_time='01:00:00' ,
                           session_date='2023-05-13T07:32:38')
    test_session.clean()
    test_session.save()
    assert test_session.user == create_user_instance
    assert test_session.summary == summary_instance
    assert test_session.session_type == 'running'
    assert test_session.distance == 10
    assert test_session.intensity == 'medium'
    assert test_session.length_time == '01:00:00'
    assert test_session.session_date == '2023-05-13T07:32:38'


@pytest.mark.django_db
def test_validation_error_triggering_session_model(create_user_instance):
    session_type = 'running'
    summary_type = 'hiking'
    summary_instance = Summary.objects.get(user=create_user_instance , summary_type=summary_type)
    test_session = Session(user=create_user_instance , summary=summary_instance , session_type=session_type ,
                           distance=10 , intensity='medium' , length_time='01:00:00' ,
                           session_date='2023-05-13T07:32:38')
    with pytest.raises(ValidationError):
        test_session.clean()


@pytest.mark.django_db
def test_delete_session_model(create_user_instance):
    session_type = 'running'
    summary_instance = Summary.objects.get(user=create_user_instance , summary_type=session_type)
    test_session = Session(user=create_user_instance , summary=summary_instance , session_type=session_type ,
                           distance=10 , intensity='medium' , length_time='01:00:00' ,
                           session_date='2023-05-13T07:32:38')
    test_session.clean()
    test_session.save()
    test_session.delete()

    with pytest.raises(Session.DoesNotExist):
        Session.objects.get(id=test_session.id)


@pytest.mark.django_db
def test_get_session_model(create_user_instance):
    session_type = 'walking'
    summary_instance = Summary.objects.get(user=create_user_instance , summary_type=session_type)
    test_session = Session(user=create_user_instance , summary=summary_instance , session_type=session_type ,
                           distance=10 , intensity='medium' , length_time='01:00:00' ,
                           session_date='2023-05-13T07:32:38')
    test_session.clean()
    test_session.save()

    retrieved_session = Session.objects.get(id = test_session.id)
    assert retrieved_session == test_session


@pytest.mark.django_db
def test_invalid_update_session_model(create_user_instance):
    session_type = 'hiking'
    summary_instance = Summary.objects.get(user=create_user_instance , summary_type=session_type)
    test_session = Session(user=create_user_instance , summary=summary_instance , session_type=session_type ,
                           distance=10 , intensity='medium' , length_time='01:00:00' ,
                           session_date='2023-05-13T07:32:38')
    test_session.clean()
    test_session.save()

    test_session.session_type = 'running'
    with pytest.raises(ValidationError):
        test_session.clean()


@pytest.mark.django_db
def test_update_session_model(create_user_instance):
    session_type = 'hiking'
    summary_instance = Summary.objects.get(user=create_user_instance , summary_type=session_type)
    test_session = Session(user=create_user_instance , summary=summary_instance , session_type=session_type ,
                           distance=10 , intensity='medium' , length_time='01:00:00' ,
                           session_date='2023-05-13 07:32:38')
    test_session.clean()
    test_session.save()

    test_session.distance = 30
    test_session.intensity = 'hard'
    test_session.length_time = '00:40:00'
    test_session.session_date = '2023-04-12 17:11:11'

    test_session.clean()
    test_session.save()

    assert test_session.distance == 30
    assert test_session.intensity == 'hard'
    assert test_session.length_time == '00:40:00'
    assert test_session.session_date == '2023-04-12 17:11:11'
