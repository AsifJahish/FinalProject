from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def validate(self, data):
        """
        Custom validation to ensure size or clothing_size is provided based on the category.
        """
        category = data.get('category')

        if category == 'SHOES' and not data.get('size'):
            raise serializers.ValidationError("Size is required for shoes.")
        if category == 'CLOTHING' and not data.get('clothing_size'):
            raise serializers.ValidationError("Clothing size is required for clothing.")

        return data
