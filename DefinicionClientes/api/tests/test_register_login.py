from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAPITests(APITestCase):
    def setUp(self):
        self.register_url = reverse('register') 
        self.login_url = reverse('token_obtain_pair')  
        self.logout_url = reverse('token_logout')  
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com'
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_register_user(self):
        self.user_data['username'] = 'newuser'
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        response = self.client.post(self.login_url, {
            'username': self.user_data['username'],
            'password': self.user_data['password']
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_logout_user(self):
        response = self.client.post(self.login_url, {
            'username': self.user_data['username'],
            'password': self.user_data['password']
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('refresh', response.data)

        refresh_token = response.data['refresh']
        response = self.client.post(self.logout_url, {'refresh_token': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)

