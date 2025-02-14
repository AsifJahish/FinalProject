from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'comment', 'created_at')  # Removed 'title'
    search_fields = ('comment',)  # Replaced 'title' with 'comment'
