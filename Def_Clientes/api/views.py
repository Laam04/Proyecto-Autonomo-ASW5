from rest_framework import generics
from .models import Cliente
from .serializer import ItemSerializer

class CLienteList(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ItemSerializer

class ClienteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ItemSerializer
