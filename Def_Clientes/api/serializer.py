from rest_framework import serializers
from .models import Cliente

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'