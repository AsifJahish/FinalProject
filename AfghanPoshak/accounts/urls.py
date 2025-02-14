from django.urls import path
from .views import user_signin, UserSignupView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user-signup'),
    path('signin/', user_signin, name='user-signin'),  # Add this line
]
