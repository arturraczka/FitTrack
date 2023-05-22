from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

from apps.api.models import Session, Summary
from apps.user.models import CustomUser


@admin.register(CustomUser)
class UserAdmin(DefaultUserAdmin):
    pass


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    fields = (
        "user", "summary", "session_type", "distance", "intensity", "length_time", "start_date",
    )
    list_display = (
        "user", "summary", "session_type", "distance", "intensity", "length_time", "start_date",
    )
    readonly_fields = (
    )


@admin.register(Summary)
class SessionAdmin(admin.ModelAdmin):
    fields = (
        "user", "summary_type", "total_distance", "total_number_sessions", "total_length_time", "last_session",
    )
    list_display = (
        "user", "summary_type", "total_distance", "total_number_sessions", "total_length_time", "last_session",
    )
    readonly_fields = (
    )