from django.urls import path
from .views import level_view, validate_sequence

urlpatterns = [
    path('level/<int:level_id>/', level_view, name='level'),
    path('validate-sequence/', validate_sequence, name='validate_sequence'),
]
