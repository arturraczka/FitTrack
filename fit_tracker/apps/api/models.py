from django.db import models
from django.contrib.auth import get_user_model


class Session(models.Model):
    INTENSITY_CHOICES = [
        (0.6, "easy"),
        (1, "medium"),
        (1.5, "hard"),
    ]

    user = models.ForeignKey(to = get_user_model(), on_delete = models.CASCADE)
    distance = models.DecimalField(max_digits = 4, decimal_places = 1, blank = False)
    intensity = models.IntegerField(blank = False, choices = INTENSITY_CHOICES)
    length_time = models.DurationField(blank = False)
    start_date = models.DateTimeField(blank = False)
    calories_burnt = models.IntegerField(blank = True)

    class Meta:
        abstract = True


class RunningSession(Session):
    calories_burn_rate = models.IntegerField(blank = True, default = 60)


class SwimmingSession(Session):
    calories_burn_rate = models.IntegerField(blank = True, default = 350)


class CyclingSession(Session):
    calories_burn_rate = models.IntegerField(blank = True, default = 30)


class WalkingSession(Session):
    calories_burn_rate = models.IntegerField(blank = True, default = 50)


class HikingSession(Session):
    calories_burn_rate = models.IntegerField(blank = True, default = 80)


class Summary(models.Model):
    user = models.ForeignKey(to = get_user_model() , on_delete = models.CASCADE)
    total_distance = models.IntegerField(blank = True)
    total_length_time = models.DurationField(blank = True)
    total_calories_burnt = models.IntegerField(blank = True)
    total_sessions = models.IntegerField(blank = True)
    last_session_date = models.DateTimeField(blank = True)

    class Meta:
        abstract = True


class RunningSummary(Summary):
    pass


class SwimmingSummary(Summary):
    pass


class CyclingSummary(Summary):
    pass


class WalkingSummary(Summary):
    pass


class HikingSummary(Summary):
    pass
