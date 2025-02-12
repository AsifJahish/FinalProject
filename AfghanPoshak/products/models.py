from django.db import models

# Create your models here.
from django.db import models

CATEGORY_CHOICES = [
    ('clothing', 'Clothing'),
    ('shoes', 'Shoes'),
]

SIZE_CHOICES = [
    ('XS', 'Extra Small'),
    ('S', 'Small'),
    ('M', 'Medium'),
    ('L', 'Large'),
    ('XL', 'Extra Large'),
    ('XXL', '2X Large'),
]

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, blank=True, null=True)
    shoe_size = models.IntegerField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    def __str__(self):
        return self.name
