from django.db.models import Q
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from apps.api.models import Summary , Session

User = get_user_model()


@receiver(post_save, weak=False, sender=User)
def create_summary_instances(sender, instance, created, **kwargs):
    if created:
        for activity in ("running", "cycling", "hiking", "swimming", "walking"):
            Summary.objects.create(user=instance, summary_type=activity)


@receiver(post_save, weak=False, sender=Session)
def update_summary_instance(sender, instance, created, **kwargs):
    summary_instance = Summary.objects.get(Q(user=instance.user) & Q(summary_type=instance.session_type))
    sessions_set = Session.objects.filter(Q(user=instance.user) & Q(session_type=instance.session_type)).order_by("-start_date")

    summary_instance.total_number_sessions = len(sessions_set)
    summary_instance.last_session = sessions_set[0].start_date
    total_distance = 0
    # total_length_time = '00:00:00'
    for session in sessions_set:
        total_distance += session.distance
        # session.length_time
    summary_instance.total_distance = total_distance
    summary_instance.save()

    # pomyslec o prefetch_related/select_related
    # uzupelnic total_length_time
    # zweryfikowac ilosc db hits i zoptymalizowac
    # dodac view do zaprezentowania Summary, raczej easy