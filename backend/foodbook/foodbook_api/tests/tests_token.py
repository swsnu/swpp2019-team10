'''
    test views/token_views.py
'''
import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from foodbook_api.models import Profile

def get_csrf_token(client):
    '''
        method that get csrf token
    '''
    response = client.get('/api/token/')
    csrftoken = response.cookies['csrftoken'].value
    return csrftoken

# Create your tests here.
class TokenTestCase(TestCase):
    '''
        class that tests views/token_views.py
    '''
    def setUp(self):
        user = User.objects.create_user(username='swpp1', password='iluvswpp')
        Profile.objects.create(user=user, phone_number='01035961111', age=22, gender='M')

    def test_token(self):
        '''
            test /api/token/
        '''
        client = Client(enforce_csrf_checks=True)

        response = client.post('/api/token/',
                               json.dumps({'username': 'swpp1', 'password': 'iluvswpp'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=get_csrf_token(client))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)

        response = client.post('/api/signin/',
                               json.dumps({'username': 'swpp1', 'password': 'iluvswpp'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=get_csrf_token(client))
        self.assertEqual(response.status_code, 204)
