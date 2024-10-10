from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()

class UserViewSetTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user) 
        self.user_url = reverse('user-list')
        self.user_detail_url = reverse('user-detail', kwargs={'pk': self.user.pk})

    def test_create_user(self):
        data = {
            'username': 'newuser',
            'password': 'newpassword',
            'email': 'newuser@example.com',
            'perfil': {
                'address': None,
                'is_verified': True
            }
        }
        response = self.client.post(self.user_url, data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    


