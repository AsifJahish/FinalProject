from django.contrib import admin

# Register your models here.
from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ['email', 'full_name', 'phone_number', 'is_active', 'is_admin']
    list_filter = ['is_active', 'is_admin']
    search_fields = ['email', 'full_name', 'phone_number']

admin.site.register(CustomUser, CustomUserAdmin)
