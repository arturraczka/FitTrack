import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.api.models import Session, Summary
from apps.api.views import SummaryListView

User = get_user_model()


@pytest.mark.django_db
def test_summary_list_view():
    user = User.objects.create_user(username='testuser', password='testpass')

    client = APIClient()
    client.force_authenticate(user=user)

    url = reverse('summary-list')
    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK

    # expected_data = {
    #     'id': summary.id,
    #     'user': summary.user.id,
    #     'summary_type': summary.summary_type,
    #     'total_distance': str(summary.total_distance),
    #     'total_number_sessions': summary.total_number_sessions,
    #     'average_length_time': str(summary.average_length_time),
    #     'last_session': summary.last_session.strftime('%Y-%m-%d %H:%M')
    # }
    assert len(response.data) == 5
