'''
    test views/recommendation_views.py
'''
# pylint: disable=W0105, R0904, R0801
from django.test import TestCase, Client
from django.contrib.auth.models import User
from foodbook_api.models import Profile, Review, Menu, Restaurant
from foodbook_api.tests.tests_user import make_image_file

# Create your tests here.
class RecommendationTestCase(TestCase):
    '''
        class that tests views/recommendation_views.py
    '''
    def setUp(self):
        user1 = User.objects.create_user(
            username='TEST_USER_R1', email='TEST_EMAIL_R1', password='TEST_PW_R1')
        user2 = User.objects.create_user(
            username='TEST_USER_R2', email='TEST_EMAIL_R2', password='TEST_PW_R2')
        user3 = User.objects.create_user(
            username='TEST_USER_R3', email='TEST_EMAIL_R3', password='TEST_PW_R3')
        profile_user1 = Profile.objects.create(
            user=user1,
            phone_number='TEST_PHN_R1',
            age=10,
            gender='M',
            nickname='user1',
            taste={'sweet':4, 'sour':0, 'bitter':0, 'salty':1, 'umami':1}
        )
        Profile.objects.create(
            user=user2,
            phone_number='TEST_PHN_R2',
            age=20,
            gender='M',
            nickname='user2',
            taste={'sweet':0, 'sour':0, 'bitter':0, 'salty':4, 'umami':1}
        )
        profile_user3 = Profile.objects.create(
            user=user3,
            phone_number='TEST_PHN_R3',
            age=30,
            gender='F',
            nickname='user3',
            taste={'sweet':1, 'sour':1, 'bitter':4, 'salty':1, 'umami':0}
        )
        profile_user1.friend.add(profile_user3)
        profile_user3.friend.add(profile_user1)
        restaurant1 = Restaurant.objects.create(
            name='TEST_REST1',
            latitude=37.5,
            longitude=126.95,
            rating=5
        )
        restaurant2 = Restaurant.objects.create(
            name='TEST_REST2',
            latitude=37.8,
            longitude=126.93,
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
            content='TEST_CONTENT_R2',
            rating=1,
            review_img=make_image_file()[1]
        )

        Review.objects.create(
            author=profile_user3,
            restaurant=restaurant1,
            menu=menu2,
            content='TEST_CONTENT_R3',
            rating=2
        )

        Review.objects.create(
            author=profile_user3,
            restaurant=restaurant2,
            menu=menu3,
            content='TEST_CONTENT_R4',
            rating=3,
            review_img=make_image_file()[1]
        )

        Review.objects.create(
            author=profile_user3,
            restaurant=restaurant2,
            menu=menu4,
            content='TEST_CONTENT_R1',
            rating=4
        )

    def test_recomloc(self):
        '''
            method that tests /api/review/<int:review_id>/recomloc/<str:coordinate_val/
        '''
        client = Client()

        review1_id = Review.objects.get(content='TEST_CONTENT_R2').id

        url = '/api/review/' + str(review1_id) + '/recomloc/' + 'c=37.5,126.95/'

        response = client.post(url)
        self.assertEqual(response.status_code, 405)

        response = client.get(url)
        self.assertEqual(response.status_code, 401)

        client.login(username='TEST_USER_R1',
                     email='TEST_EMAIL_R1', password='TEST_PW_R1')

        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        print(response.content.decode())

    def test_recomtst(self):
        '''
            method that tests /api/review/<int:review_id>/recomtst/
        '''
        client = Client()

        review1_id = Review.objects.get(content='TEST_CONTENT_R2').id

        response = client.post('/api/review/' + str(review1_id) + '/recomtst/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/review/' + str(review1_id) + '/recomtst/')
        self.assertEqual(response.status_code, 401)

        client.login(username='TEST_USER_R1',
                     email='TEST_EMAIL_R1', password='TEST_PW_R1')

        response = client.get('/api/review/' + str(review1_id) + '/recomtst/')
        self.assertEqual(response.status_code, 200)
        print(response.content.decode())
