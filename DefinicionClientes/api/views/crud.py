from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.models import User, Perfil, Currency, ClientAccounts
from api.serializers import UserSerializer, PerfilSerializer, CurrencySerializer, ClientAccountsSerializer

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        user_data = request.data
        perfil_data = user_data.pop('perfil', None)

        user_serializer = self.get_serializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        self.perform_create(user_serializer)
        user = user_serializer.instance

        if perfil_data is None:
            perfil_data = {
                'address': None,
                'is_verified': False
            }

        perfil_data['user'] = user.id
        perfil_serializer = PerfilSerializer(data=perfil_data)
        perfil_serializer.is_valid(raise_exception=True)
        perfil_serializer.save()

        headers = self.get_success_headers(user_serializer.data)
        return Response(user_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        user_data = request.data
        perfil_data = user_data.pop('perfil', None)

        user_serializer = self.get_serializer(instance, data=user_data, partial=partial)
        user_serializer.is_valid(raise_exception=True)
        self.perform_update(user_serializer)

        if perfil_data is None:
            perfil_data = {
                'address': None,
                'is_verified': False
            }

        if perfil_data and hasattr(instance, 'perfil'):
            perfil_serializer = PerfilSerializer(instance.perfil, data=perfil_data, partial=partial)
            perfil_serializer.is_valid(raise_exception=True)
            perfil_serializer.save()

        return Response(user_serializer.data)

class CurrencyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer

class ClientAccountsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = ClientAccounts.objects.all()
    serializer_class = ClientAccountsSerializer