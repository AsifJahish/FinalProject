from django.urls import path
from .views import user_signin, UserSignupView

from .views import UserProfileView

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('signup/', UserSignupView.as_view(), name='user-signup'),
    path('signin/', user_signin, name='user-signin'),  # Add this line
]
