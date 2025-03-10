from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSignupSerializer
from django.contrib.auth import get_user_model

from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

User = get_user_model()

class UserSignupView(APIView):
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        users = User.objects.all()
        serializer = UserSignupSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def user_signin(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        # Authenticate user
        user = authenticate(email=email, password=password)

        if user:
            # Generate token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Return token in the response
            return JsonResponse({
                "message": "Login successful!",
                "token": access_token  # Send the token back
            }, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

def user_login(request):
    # Your login logic here (e.g., check credentials)
    
    if credentials_are_valid:
        user = get_user_from_credentials(request)  # Assuming you have a way to fetch the user
        refresh = RefreshToken.for_user(user)  # Create refresh and access tokens
        return Response({
            'token': str(refresh.access_token)  # Send token in response
        })
    else:
        return Response({'detail': 'Invalid credentials'}, status=400)




from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import UserProfileSerializer

User = get_user_model()

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully!", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
