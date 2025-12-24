from django.urls import path
from .views import home, ProcessTextAPIView

urlpatterns = [
    path('', home, name='home'),
    path('api/process/', ProcessTextAPIView.as_view(), name='process'),
]
