from django.test import TestCase, Client
from foodbook_api.models import Profile
from django.contrib.auth.models import User
import json

def get_csrf_token(client):
    response = client.get('/api/token/')
    csrftoken = response.cookies['csrftoken'].value
    return csrftoken

# Create your tests here.
class TokenTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='swpp1', password='iluvswpp')
        Profile.objects.create(user=user, phone_number='01035961111', age=22, gender='M')

    def test_token(self):
        client = Client(enforce_csrf_checks=True)

        response = client.post('/api/token/', json.dumps({'username': 'swpp1', 'password': 'iluvswpp'}),
                                content_type='application/json', HTTP_X_CSRFTOKEN=get_csrf_token(client))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)

        esponse = client.post('/api/signin/', json.dumps({'username': 'swpp1', 'password': 'iluvswpp'}),
                                content_type='application/json', HTTP_X_CSRFTOKEN=get_csrf_token(client))
        self.assertEqual(response.status_code, 204)
