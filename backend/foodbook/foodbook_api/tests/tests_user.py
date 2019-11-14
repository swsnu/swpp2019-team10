'''
    test views/user_views.py
'''
# pylint: disable=W0105, R0904, R0801
import json
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.test import TestCase, Client
from django.contrib.auth.models import User
from foodbook_api.models import Profile

def login_user1(client):
    '''
        method that log in with user 1
    '''
    client.post('/api/signin/', json.dumps({'username': 'swpp1', 'password': 'iluvswpp'}),
                content_type='application/json')

def make_image_file():
    '''
        method that make fake image file
    '''
    file_obj = BytesIO()
    img = Image.new('RGB', (60, 30), color='red')
    img.save(file_obj, 'png')
    file_obj.seek(0)
    file = File(file_obj, name='test.png')
    return (img, file)

# Create your tests here.
class UserTestCase(TestCase):
    '''
        class that tests views/token_views.py
    '''
    def setUp(self):
        user = User.objects.create_user(username='swpp1', password='iluvswpp')
        Profile.objects.create(user=user, phone_number='01035961111', age=22,
                               gender='M', nickname='user1')
        user2 = User.objects.create_user(username='swpp2', password='iluvswpp')
        Profile.objects.create(user=user2, phone_number='01035961112', age=22,
                               gender='M', nickname='user2')
        user3 = User.objects.create_user(username='friend1', password='iluvswpp',)
        Profile.objects.create(user=user3, phone_number='01035961113', age=22,
                               gender='M', nickname='user3')
        client = Client()
        img_and_file = make_image_file()
        client.post('/api/signup/1/image/', data={'profile_pic': img_and_file[1]})

    def test_signup(self):
        '''
            method that tests /api/signup/
        '''
        client = Client()

        response = client.get('/api/signup/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signup/',
                               json.dumps({'username1': 'swpp2', 'password': 'iluvswpp'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/signup/',
                               json.dumps({'username': 'swpp3', 'password': 'iluvswpp',
                                           'phone_number': '01035961111', 'age': 22,
                                           'gender': 'M', 'nickname': 'j'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['username'], 'swpp3')
        self.assertEqual(response.json()['gender'], 'M')

        response = client.post('/api/signup/',
                               json.dumps({'username': 'swpp4', 'password': 'iluvswpp',
                                           'nickname': 'j'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['username'], 'swpp4')
        self.assertEqual(response.json()['gender'], None)

    def test_profile_image(self):
        '''
            method that tests /api/signup/:user_id/image/
        '''
        client = Client()

        response = client.post('/api/signup/10/image/')
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/signup/2/image/')
        self.assertEqual(response.status_code, 405)

        img_and_file = make_image_file()

        response = client.post('/api/signup/2/image/',
                               data={'profile_pic': img_and_file[1]})
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/signup/2/image/',
                               data={'profile_pic': img_and_file[0].tobytes()})
        self.assertEqual(response.status_code, 400)

    def test_signup_dupcheck(self):
        '''
            method that tests /api/signup/:username/
        '''
        client = Client()

        response = client.get('/api/signup_dupcheck/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signup_dupcheck/',
                               json.dumps({'username1': 'swpp1'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/signup_dupcheck/',
                               json.dumps({'username': 'swpp1'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['id'], 1)

        response = client.post('/api/signup_dupcheck/',
                               json.dumps({'username': 'swpp10'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['id'], -1)

    def test_signin(self):
        '''
            method that tests /api/signin/
        '''
        client = Client()

        response = client.get('/api/signin/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signin/',
                               json.dumps({'username1': 'swpp1', 'password': 'iluvswpp'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/signin/',
                               json.dumps({'username': 'swpp3', 'password': 'iluvswpp'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/',
                               json.dumps({'username': 'swpp1', 'password': 'iluvswpp'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

    def test_signout(self):
        '''
            method that tests /api/signout/
        '''
        client = Client()

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 401)

        login_user1(client)
        response = client.post('/api/signout/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 204)

    def test_user(self):
        '''
            method that tests /api/
        '''
        client = Client()

        response = client.get('/api/')
        self.assertEqual(response.status_code, 401)

        login_user1(client)
        response = client.post('/api/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/')
        self.assertEqual(response.json()['username'], 'swpp1')

        response = client.put('/api/',
                              json.dumps({'phone_number': '01035961114', 'age': 25, 'gender': 'F',
                                          'nickname': 'j'}),
                              content_type='application/json')
        self.assertEqual(response.json()['age'], 25)

        response = client.put('/api/',
                              json.dumps({}),
                              content_type='application/json')
        self.assertEqual(response.json()['age'], 25)

    def test_friend(self):
        '''
            method that tests /api/friend/
        '''
        client = Client()

        response = client.get('/api/friend/')
        self.assertEqual(response.status_code, 401)

        login_user1(client)
        response = client.put('/api/friend/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/friend/', json.dumps({'username2': 'friend1'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/friend/', json.dumps({'id': 3}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/friend/')
        self.assertEqual(response.json()['friends_list'], [[3, 'user3']])

    def test_friend_detail(self):
        '''
            method that tests /api/friend/:friend_id/
        '''
        client = Client()

        response = client.get('/api/friend/3/')
        self.assertEqual(response.status_code, 401)

        login_user1(client)
        response = client.put('/api/friend/3/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/friend/4/')
        self.assertEqual(response.status_code, 404)

        img_and_file = make_image_file()
        client.post('/api/signup/3/image/', data={'profile_pic': img_and_file[1]})

        response = client.get('/api/friend/3/')
        self.assertEqual(response.json()['username'], 'friend1')

        response = client.delete('/api/friend/4/')
        self.assertEqual(response.status_code, 404)

        response = client.post('/api/friend/', json.dumps({'id': 3}),
                               content_type='application/json')
        response = client.delete('/api/friend/3/')
        self.assertEqual(response.status_code, 200)
