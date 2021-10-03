from django.contrib import admin
from .models import User, UserReview


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(UserReview)
class UserReviewAdmin(admin.ModelAdmin):
    raw_id_fields = (
        'mentor',
        'mentee',
    )