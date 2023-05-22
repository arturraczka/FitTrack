from django.contrib.auth import get_user_model
from django.db import models


class Summary(models.Model):
    SUMMARY_TYPE_CHOICES = [
        ("running" , "running") ,
        ("cycling" , "cycling") ,
        ("hiking" , "hiking") ,
        ("swimming" , "swimming") ,
        ("walking" , "walking") ,
    ]
    user = models.ForeignKey(to=get_user_model(), on_delete = models.CASCADE)
    summary_type = models.CharField(max_length = 10, choices = SUMMARY_TYPE_CHOICES)
    total_distance = models.DecimalField(max_digits = 10, decimal_places = 1, null=True)
    total_number_sessions = models.IntegerField(null=True)
    total_length_time = models.DurationField(null=True)
    last_session = models.DateTimeField(null=True)

    def __str__(self):
        return (
            f"{self.user.username}: "
            f"{self.summary_type}"
        )


class Session(models.Model):
    INTENSITY_CHOICES = [
        ("easy", "easy"),
        ("medium", "medium"),
        ("hard", "hard"),
    ]

    SESSION_TYPE_CHOICES = [
        ("running", "running"),
        ("cycling", "cycling"),
        ("hiking", "hiking"),
        ("swimming" , "swimming") ,
        ("walking" , "walking") ,
    ]
    user = models.ForeignKey(to=get_user_model(), on_delete = models.CASCADE)
    summary = models.ForeignKey(to=Summary, on_delete = models.CASCADE, null = True)
    session_type = models.CharField(max_length = 10, choices = SESSION_TYPE_CHOICES)
    distance = models.DecimalField(max_digits = 4, decimal_places = 1)
    intensity = models.CharField(max_length = 10, choices = INTENSITY_CHOICES)
    length_time = models.DurationField()
    start_date = models.DateTimeField()

    def __str__(self):
        return (
            f"{self.user.username}: "
            f"{self.session_type}: "
            f"{self.start_date:%Y-%m-%d %H:%M}"
        )
