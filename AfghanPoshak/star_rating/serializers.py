from rest_framework import serializers
from .models import StarRating

class StarRatingSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')  # Include user email
    product_name = serializers.ReadOnlyField(source='product.name')  # Include product name

    class Meta:
        model = StarRating
        fields = ['id', 'product', 'product_name', 'user', 'user_email', 'rating']
        read_only_fields = ['user']  # Auto-assign user
