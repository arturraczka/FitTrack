from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

from apps.api.models import Session
from apps.user.models import CustomUser


@admin.register(CustomUser)
class UserAdmin(DefaultUserAdmin):
    pass


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    fields = (
        "user", "session_type", "distance", "intensity", "length_time", "start_date",
    )
    list_display = (
        "user", "session_type", "distance", "intensity", "length_time", "start_date",
    )
    readonly_fields = (
    )