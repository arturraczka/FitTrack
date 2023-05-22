from faker import Faker
from django.core.management.base import BaseCommand
from apps.api.models import Session
from apps.user.models import CustomUser
from datetime import timedelta

User = CustomUser
fake = Faker()


class Command(BaseCommand):

    def handle(self, *args, **options):
        user = User.objects.get(username="artur")
        for _ in range(1):
            session_type = fake.random_element(elements=('running', 'cycling', 'hiking', 'swimming', 'walking'))
            distance = fake.random_int(min=5, max=55)
            intensity = fake.random_element(elements=('easy', 'medium', 'hard'))
            length_time = timedelta(hours=fake.random_int(min=0, max=2), minutes=fake.random_int(min=0, max=59))
            start_date = fake.date_time_between(start_date = '-1y', end_date = 'now')
            Session.objects.create(user=user, session_type=session_type, distance=distance, intensity=intensity,
                                   length_time=length_time, start_date=start_date)
