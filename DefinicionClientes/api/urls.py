from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import UserViewSet, CurrencyViewSet, ClientAccountsViewSet, RegisterView, ObtainCustomToken, LogoutView

router = DefaultRouter()
router.register(r'users', UserViewSet)  
router.register(r'currencies', CurrencyViewSet) 
router.register(r'client-accounts', ClientAccountsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', ObtainCustomToken.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='token_logout'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
