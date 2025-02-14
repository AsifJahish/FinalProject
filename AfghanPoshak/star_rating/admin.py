from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import StarRating

@admin.register(StarRating)
class StarRatingAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating')
    list_filter = ('rating',)
