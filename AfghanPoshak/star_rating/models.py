from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product

User = get_user_model()

class StarRating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="ratings")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, str(i)) for i in range(1, 6)])

    class Meta:
        unique_together = ('product', 'user')  # Prevents duplicate ratings by the same user

    def __str__(self):
        return f"{self.product.name} - {self.rating} stars by {self.user.email}"
