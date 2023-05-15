from django.db import models
from django.contrib.auth import get_user_model


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

    user = models.ForeignKey(to = get_user_model(), on_delete = models.CASCADE)
    session_type = models.CharField(blank = True, max_length = 10, choices = SESSION_TYPE_CHOICES)
    distance = models.DecimalField(max_digits = 4, decimal_places = 1, blank = False)
    intensity = models.CharField(blank = False, max_length = 10, choices = INTENSITY_CHOICES)
    length_time = models.DurationField(blank = False)
    start_date = models.DateTimeField(blank = False)

    def __str__(self):
        return (
            f"{self.user.username}: "
            f"{self.session_type}: "
            f"{self.start_date:%Y-%m-%d %H:%M}"
        )