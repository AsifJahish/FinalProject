from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')  # To include user's email
    product_name = serializers.ReadOnlyField(source='product.name')  # To include product name

    class Meta:
        model = Review
        fields = ['id', 'user', 'user_email', 'product', 'product_name', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']
