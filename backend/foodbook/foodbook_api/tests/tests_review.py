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
        profile_user3.friend.add(profile_user1)
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
            content='TEST_CONTENT',
            rating=5
        )
    """
    test review_list
    """
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
            'rating': 5
        }, 'application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Review.objects.count(), 2)
    def test_post_review_list_fail(self):
        client=Client()
        response = client.post('/api/review/', {
            'content': 'TEST_NEW_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
        }, 'application/json')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.post('/api/review/', {
            'content': 'TEST_NEW_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
        })
        self.assertEqual(response.status_code, 400)
    def test_review_list_other_method_not_allowed(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.put('/api/review/')

        self.assertEqual(response.status_code, 405)

    
    """
    test review_detail
    """
    def test_get_review_detail_success(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/review/1/')
        self.assertEqual(response.status_code, 200)
        '''
        {
            'id': review.id,
            'author': review.author.id,
            'restaurant': review.restaurant.id,
            'menu': review.menu.id,
            'content': review.content,
            'rating': review.rating,
            'date': review.date,
            'image': review.review_img.url
        }
        '''
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['id'], 1)
        self.assertEqual(bodys['author'], 1)
        self.assertEqual(bodys['content'], 'TEST_CONTENT')
        self.assertEqual(bodys['restaurant'], 1)
        self.assertEqual(bodys['menu'], 1)
        self.assertEqual(bodys['rating'], 5)
    def test_get_review_detail_fail(self):
        client = Client()
        response = client.get('/api/review/1/')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/review/7/')
        self.assertEqual(response.status_code, 404)
    def test_put_review_detail_success(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.put('/api/review/1/', {
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'rating': 3
        }, 'application/json')
        self.assertEqual(response.status_code, 200)
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['id'], 1)
        self.assertEqual(bodys['author'], 1)
        self.assertEqual(bodys['content'], 'TEST_PUT_CONTENT')
        self.assertEqual(bodys['restaurant'], 1)
        self.assertEqual(bodys['menu'], 1)
        self.assertEqual(bodys['rating'], 3)
    def test_put_review_detail_fail(self):
        client = Client()
        response = client.put('/api/review/1/', {
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'rating': 3
        }, 'application/json')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_2',
                     email='TEST_EMAIL_2', password='TEST_PW_2')
        response = client.put('/api/review/1/', {
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'rating': 3
        }, 'application/json')
        self.assertEqual(response.status_code, 403)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.put('/api/review/1/', {
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'rating': 3
        })
        self.assertEqual(response.status_code, 400)
        response = client.put('/api/review/7/', {
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'rating': 3
        }, 'application/json')
        self.assertEqual(response.status_code, 404)
    def test_delete_review_success(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.delete('/api/review/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Review.objects.count(), 0)
    def test_delete_review_fail(self):
        client = Client()
        response = client.delete('/api/review/1/')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_2',
                     email='TEST_EMAIL_2', password='TEST_PW_2')
        response = client.delete('/api/review/1/')
        self.assertEqual(response.status_code, 403)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.delete('/api/review/7/')
        self.assertEqual(response.status_code, 404)

    def test_review_detail_other_method_not_allowed(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.post('/api/review/1/')
        self.assertEqual(response.status_code, 405)


    """
    test friend_review_list
    """

    def test_get_friend_review_list_success(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/friend/3/review/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), "[]")
    def test_get_friend_review_list_fail(self):
        client = Client()
        response = client.get('/api/friend/3/review/')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/friend/2/review/')
        self.assertEqual(response.status_code, 403)
        response = client.get('/api/friend/7/review/')
        self.assertEqual(response.status_code, 404)
    def test_friend_list_other_method_not_allowed(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.put('/api/friend/3/review/')
        self.assertEqual(response.status_code, 405)
    
    """
    test friend_review_detail
    """

    def test_get_friend_review_detail_success(self):
        client = Client()
        client.login(username='TEST_USER_3',
                     email='TEST_EMAIL_3', password='TEST_PW_3')
        response = client.get('/api/friend/1/review/1/')
        self.assertEqual(response.status_code, 200)
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['id'], 1)
        self.assertEqual(bodys['author'], 1)
        self.assertEqual(bodys['content'], 'TEST_CONTENT')
        self.assertEqual(bodys['restaurant'], 1)
        self.assertEqual(bodys['menu'], 1)
        self.assertEqual(bodys['rating'], 5)
    def test_get_friend_review_detail_fail(self):
        client = Client()
        response = client.get('/api/friend/1/review/1/')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_3',
                     email='TEST_EMAIL_3', password='TEST_PW_3')
        response = client.get('/api/friend/2/review/1/')
        self.assertEqual(response.status_code, 403)
        response = client.get('/api/friend/1/review/3/')
        self.assertEqual(response.status_code, 404)
        response = client.get('/api/friend/7/review/3/')
        self.assertEqual(response.status_code, 404)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/friend/3/review/1/')
        self.assertEqual(response.status_code, 403)
    '''
    def test_image(self):
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
    '''
