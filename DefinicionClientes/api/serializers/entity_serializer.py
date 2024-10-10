from rest_framework import serializers
from api.models import User, Perfil, Currency, ClientAccounts

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    perfil = PerfilSerializer(required=False)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = '__all__' 
    
    def update(self, instance, validated_data):
        perfil_data = validated_data.pop('perfil', None)
        instance.username = validated_data.get('username', instance.username)
        instance.save()

        if perfil_data:
            perfil = instance.perfil
            perfil.address = perfil_data.get('address', perfil.address)
            perfil.is_verified = perfil_data.get('is_verified', perfil.is_verified)
            perfil.save()
        else:
            if not hasattr(instance, 'perfil'):
                Perfil.objects.create(user=instance, address=None, is_verified=False)
        return instance

        
    
class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'

class ClientAccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientAccounts
        fields = '__all__'

