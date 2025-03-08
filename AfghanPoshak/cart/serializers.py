from rest_framework import serializers
from .models import CartItem

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source="product.name")

    class Meta:
        model = CartItem
        fields = ["id", "user", "product", "product_name", "quantity", "added_at"]
        read_only_fields = ["user", "added_at"]
