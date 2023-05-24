from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from apps.api.models import Summary

User = get_user_model()


@receiver(post_save, weak=False, sender=User)
def create_summary_instances(sender, instance, created, **kwargs):
    if created:
        for activity in ("running", "cycling", "hiking", "swimming", "walking"):
            Summary.objects.create(user=instance, summary_type=activity)