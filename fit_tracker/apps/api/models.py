from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Q
from django.db.models import Count, Sum, Avg, Max
from django.utils import timezone
from django.core.exceptions import ValidationError


class Summary(models.Model):
    SUMMARY_TYPE_CHOICES = [
        ("running", "running"),
        ("cycling", "cycling"),
        ("hiking", "hiking"),
        ("swimming", "swimming"),
        ("walking", "walking"),
    ]
    user = models.ForeignKey(to=get_user_model(), related_name = 'summaries', on_delete = models.CASCADE)
    summary_type = models.CharField(max_length = 10, choices = SUMMARY_TYPE_CHOICES)

    total_distance = models.DecimalField(max_digits = 10, decimal_places = 1, null=True, blank = True)
    total_number_sessions = models.IntegerField(null=True, blank = True)
    average_length_time = models.DurationField(null=True, blank = True)
    last_session = models.DateTimeField(null=True, blank = True)

    class Meta:
        ordering = ['user', '-summary_type']

    def __str__(self):
        return (
            f"{self.user}: "
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
        ("swimming", "swimming"),
        ("walking", "walking"),
    ]
    user = models.ForeignKey(to=get_user_model(), related_name = 'sessions', on_delete = models.CASCADE)
    summary = models.ForeignKey(to=Summary, related_name = 'sessions', on_delete = models.CASCADE, null = True,
                                blank = True)
    session_type = models.CharField(max_length = 10, choices = SESSION_TYPE_CHOICES)

    intensity = models.CharField(max_length = 10, choices = INTENSITY_CHOICES)
    distance = models.DecimalField(max_digits = 4, decimal_places = 1)
    length_time = models.DurationField()
    session_date = models.DateTimeField(default = timezone.now)

    class Meta:
        ordering = ['-session_date']

    def clean(self):
        super().clean()
        if self.summary is None:
            self.summary = Summary.objects.get(Q(user = self.user) & Q(summary_type = self.session_type))
        if self.user != self.summary.user:
            raise ValidationError(f"Summary's user and Session's user must be the same.")
        if self.session_type != self.summary.summary_type:
            raise ValidationError(f"Summary type must be '{self.session_type}' for sessions with type "
                                  f"'{self.session_type}'.")

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        filtered_queryset = Session.objects.filter(
            Q(user = self.user) & Q(session_type = self.session_type)
        ).aggregate(
            total_number_sessions = Count('intensity'),
            total_distance = Sum('distance'),
            average_length_time = Avg('length_time'),
            last_session = Max('session_date')
        )
        if filtered_queryset:
            summary_instance = self.summary
            summary_instance.total_number_sessions = filtered_queryset['total_number_sessions']
            summary_instance.total_distance = filtered_queryset['total_distance']
            summary_instance.average_length_time = filtered_queryset['average_length_time']
            summary_instance.last_session = filtered_queryset['last_session']
            summary_instance.save()

    def __str__(self):
        return (
            f"{self.user}: "
            f"{self.session_type}: "
            # f"{self.session_date.strftime('%Y-%m-%d %H:%M')}"

        )
