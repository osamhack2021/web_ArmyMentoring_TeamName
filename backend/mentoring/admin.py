from django.contrib import admin
from .models import Mentoring, Assignment


@admin.register(Mentoring)
class MentoringAdmin(admin.ModelAdmin):
    raw_id_fields = (
        'mentor',
        'mentees',
        'portfolio',
        'tags',
    )

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    raw_id_fields = (
        'mentoring',
        'passed_mentees',
    )
