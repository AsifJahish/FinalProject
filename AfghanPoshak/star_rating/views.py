from rest_framework import generics, permissions
from .models import StarRating
from .serializers import StarRatingSerializer


from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import StarRating
from .serializers import StarRatingSerializer


class StarRatingListCreateView(generics.ListCreateAPIView):
    queryset = StarRating.objects.all()
    serializer_class = StarRatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Check if user already rated this product
        existing_rating = StarRating.objects.filter(user=self.request.user, product=serializer.validated_data["product"]).first()
        
        if existing_rating:
            # Update existing rating
            existing_rating.rating = serializer.validated_data["rating"]
            existing_rating.save()
            return Response(StarRatingSerializer(existing_rating).data, status=status.HTTP_200_OK)
        
        # Create new rating if none exists
        serializer.save(user=self.request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class StarRatingUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StarRating.objects.all()
    serializer_class = StarRatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StarRating.objects.filter(user=self.request.user)  # Users can only edit their own ratings
