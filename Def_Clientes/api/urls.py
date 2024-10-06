from django.urls import path
from .views import CLienteList, ClienteDetail

urlpatterns = [
    path('clientes/', CLienteList.as_view(), name='Cliente-list'),
    path('Clientes/<int:pk>/', ClienteDetail.as_view(), name='Cliente-detail'),
]
