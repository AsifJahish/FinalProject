from rest_framework import generics, permissions
from .models import StarRating
from .serializers import StarRatingSerializer

class StarRatingListCreateView(generics.ListCreateAPIView):
    queryset = StarRating.objects.all()
    serializer_class = StarRatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Assign user automatically

class StarRatingUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StarRating.objects.all()
    serializer_class = StarRatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StarRating.objects.filter(user=self.request.user)  # Users can only edit their own ratings
