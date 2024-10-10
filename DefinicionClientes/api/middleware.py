from django.http import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class TokenValidationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if 'HTTP_AUTHORIZATION' in request.META:
            auth = JWTAuthentication()
            try:
                user, token = auth.authenticate(request)
                request.user = user
            except AuthenticationFailed:
                return JsonResponse({'detail': 'Invalid token'}, status=401)

        response = self.get_response(request)
        return response