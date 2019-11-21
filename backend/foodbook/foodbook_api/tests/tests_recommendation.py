'''
    test views/user_views.py
'''
# pylint: disable=W0105, R0904, R0801
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.test import TestCase, Client
from django.contrib.auth.models import User
from foodbook_api.models import Profile, Review, Menu, Restaurant

def login_user1(client):
    '''
        method that log in with user 1
    '''
    client.login(username='TEST_USER_1',
                 email='TEST_EMAIL_1', password='TEST_PW_1')

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
class RecommendationTestCase(TestCase):
    '''
        class that tests views/token_views.py
    '''
    def setUp(self):
        user1 = User.objects.create_user(
            username='TEST_USER_1', email='TEST_EMAIL_1', password='TEST_PW_1')
        user2 = User.objects.create_user(
            username='TEST_USER_2', email='TEST_EMAIL_2', password='TEST_PW_2')
        user3 = User.objects.create_user(
            username='TEST_USER_3', email='TEST_EMAIL_3', password='TEST_PW_3')
        profile_user1 = Profile.objects.create(
            user=user1,
            phone_number='TEST_PHN_1',
            age=10,
            gender='M',
            nickname='user1',
            taste={'sweet':4, 'sour':0, 'bitter':0, 'salty':1, 'umami':1}
        )
        Profile.objects.create(
            user=user2,
            phone_number='TEST_PHN_2',
            age=20,
            gender='M',
            nickname='user2',
            taste={'sweet':0, 'sour':0, 'bitter':0, 'salty':4, 'umami':1}
        )
        profile_user3 = Profile.objects.create(
            user=user3,
            phone_number='TEST_PHN_3',
            age=30,
            gender='F',
            nickname='user3',
            taste={'sweet':1, 'sour':1, 'bitter':4, 'salty':1, 'umami':0}
        )
        profile_user1.friend.add(profile_user3)
        profile_user3.friend.add(profile_user1)
        restaurant1 = Restaurant.objects.create(
            name='TEST_REST',
            longitude=15,
            latitude=15,
            rating=5
        )
        restaurant2 = Restaurant.objects.create(
            name='TEST_REST2',
            longitude=13,
            latitude=13,
            rating=3
        )
        menu1 = Menu.objects.create(
            name='TEST_MENU',
            restaurant=restaurant1,
            taste={'sweet':4, 'sour':0, 'bitter':0, 'salty':1, 'umami':1}
        )
        menu2 = Menu.objects.create(
            name='TEST_MENU',
            restaurant=restaurant1,
            taste={'sweet':0, 'sour':0, 'bitter':0, 'salty':4, 'umami':0}
        )
        menu3 = Menu.objects.create(
            name='TEST_MENU',
            restaurant=restaurant2,
            taste={'sweet':1, 'sour':0, 'bitter':0, 'salty':4, 'umami':1}
        )
        menu4 = Menu.objects.create(
            name='TEST_MENU',
            restaurant=restaurant2,
            taste={'sweet':0, 'sour':0, 'bitter':0, 'salty':1, 'umami':4}
        )

        Review.objects.create(
            author=profile_user1,
            restaurant=restaurant1,
            menu=menu1,
            content='TEST_CONTENT2',
            rating=5,
            review_img=make_image_file()[1]
        )

        Review.objects.create(
            author=profile_user3,
            restaurant=restaurant1,
            menu=menu2,
            content='TEST_CONTENT3',
            rating=5
        )

        Review.objects.create(
            author=profile_user3,
            restaurant=restaurant2,
            menu=menu3,
            content='TEST_CONTENT4',
            rating=5,
            review_img=make_image_file()[1]
        )

        Review.objects.create(
            author=profile_user3,
            restaurant=restaurant2,
            menu=menu4,
            content='TEST_CONTENT1',
            rating=5
        )

    def test_recommendation(self):
        '''
            method that tests /api/signup/
        '''
        client = Client()

        review1_id = Review.objects.get(content='TEST_CONTENT2').id

        response = client.post('/api/review/' + str(review1_id) + '/recommendation/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/review/' + str(review1_id) + '/recommendation/')
        self.assertEqual(response.status_code, 401)

        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')

        response = client.get('/api/review/' + str(review1_id) + '/recommendation/')
        self.assertEqual(response.status_code, 200)
        print(response.content.decode())
