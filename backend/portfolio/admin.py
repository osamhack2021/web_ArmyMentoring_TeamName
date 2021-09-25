from django.contrib import admin
from .models import Portfolio, PortfolioItem, SpecificationCard


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    raw_id_fields = (
        'user',
    )

@admin.register(PortfolioItem)
class PortfolioAdmin(admin.ModelAdmin):
    raw_id_fields = (
        'portfolio',
    )

@admin.register(SpecificationCard)
class SpecificationCardAdmin(admin.ModelAdmin):
    raw_id_fields = (
        'portfolio',
    )
