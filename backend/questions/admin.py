from django.contrib import admin
from .models import Question, QuestionComment


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    raw_id_fields = (
        'user',
        'liked_user',
    )

@admin.register(QuestionComment)
class QuestionAdmin(admin.ModelAdmin):
    raw_id_fields = (
        'user',
        'question',
        'liked_user',
    )
