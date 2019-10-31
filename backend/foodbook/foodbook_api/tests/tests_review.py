from django.test import TestCase, Client
from foodbook_api.models import Profile, Review, Menu, Restaurant, ReviewForm
from django.contrib.auth.models import User
#from django.core.urlresolvers import reverse
import json
# Create your tests here.

class ReviewTestCase(TestCase):
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
            gender='TEST_G_1',
        )
        profile_user2 = Profile.objects.create(
            user=user2,
            phone_number='TEST_PHN_2',
            age=20,
            gender='TEST_G_2',
        )
        profile_user3 = Profile.objects.create(
            user=user3,
            phone_number='TEST_PHN_3',
            age=30,
            gender='TEST_G_3',
        )
        profile_user1.friend.add(profile_user3)
        restaurant = Restaurant.objects.create(
            name='TEST_REST',
            longitude=15,
            latitude=15,
            rating=5
        )
        menu = Menu.objects.create(
            name='TEST_MENU',
            restaurant=restaurant
        )
        review = Review.objects.create(
            author=profile_user1,
            restaurant=restaurant,
            menu=menu,
            content='TEST_CONTENT'
        )
    def test_get_review_list_success(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/review/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('TEST_CONTENT', response.content.decode())
    def test_get_review_list_fail(self):
        client = Client()
        response = client.get('/api/review/')
        self.assertEqual(response.status_code, 401)
    
    def test_post_review_list_success(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.post('/api/review/', {
            'content': 'TEST_NEW_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
        }, 'application/json')
        self.assertEqual(response.status_code, 201)
        

        
