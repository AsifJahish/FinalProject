from django.urls import path
from .views import ProductListCreateView, ProductDetailView, ProductCreateView

from django.conf import settings
from django.conf.urls.static import static

from .views import create_multiple_products


urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

    path('create-product/', ProductCreateView.as_view(), name='create-product'),





    path('create-multiple-products/', create_multiple_products)

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)