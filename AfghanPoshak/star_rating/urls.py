from django.urls import path
from .views import StarRatingListCreateView, StarRatingUpdateDeleteView

urlpatterns = [
    path('ratings/', StarRatingListCreateView.as_view(), name='rating-list-create'),
    path('ratings/<int:pk>/', StarRatingUpdateDeleteView.as_view(), name='rating-update-delete'),
]
