"""
test view functions of review model
"""
# pylint: disable=W0105, R0904, R0801
import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from foodbook_api.models import Profile, Review, Menu, Restaurant, Tag
from foodbook_api.tests.tests_user import make_image_file
#from django.core.urlresolvers import reverse
# Create your tests here.


class ReviewTestCase(TestCase):
    """
    test review_view.py
    methods:
        setUp
        test_get_review_list_success
        test_get_review_list_fail
        test_post_review_list_success
        test_post_review_list_fail
        test_review_list_other_method_not_allowed

        test_get_review_detail_success
        test_get_review_detail_fail
        test_put_review_detail_success
        test_put_review_detail_fail
        test_delete_review_success
        test_delete_review_fail
        test_review_detail_other_method_not_allowed

        test_get_friend_review_list_success
        test_get_friend_review_list_fail
        test_friend_list_other_method_not_allowed

        test_get_friend_review_detail_success
        test_get_friend_review_detail_fail
        test_friend_review_detail_other_method_not_allowed

        test_image_success
        test_image_fail

        test_get_restaurant_review_list_success
        test_get_restaurant_review_list_fail
        test_restaurant_review_list_other_method_not_allowed
    """
    def setUp(self):
        """
        method for setUp
        """
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
        )
        Profile.objects.create(
            user=user2,
            phone_number='TEST_PHN_2',
            age=20,
            gender='M',
            nickname='user2',
        )
        profile_user3 = Profile.objects.create(
            user=user3,
            phone_number='TEST_PHN_3',
            age=30,
            gender='F',
            nickname='user3',
        )
        profile_user1.friend.add(profile_user3)
        profile_user3.friend.add(profile_user1)
        restaurant = Restaurant.objects.create(
            name='TEST_REST',
            longitude=15,
            latitude=15,
            rating=5,
            place_id='TEST_PLACE_ID',
        )
        menu = Menu.objects.create(
            name='TEST_MENU',
            restaurant=restaurant
        )
        tag1 = Tag.objects.create(
            name='GOOD',
            sentimental=0.6
        )
        tag2 = Tag.objects.create(
            name='SOSO',
            sentimental=0.0
        )
        tag3 = Tag.objects.create(
            name='BAD',
            sentimental=-0.5
        )
        review = Review.objects.create(
            author=profile_user1,
            restaurant=restaurant,
            menu=menu,
            content='TEST_CONTENT',
            rating=5,
            category='CATEGORY1'
        )
        review.tag.add(tag1)
        review.tag.add(tag2)
        review.tag.add(tag3)

        Review.objects.create(
            author=profile_user1,
            restaurant=restaurant,
            menu=menu,
            content='TEST_CONTENT2',
            rating=5,
            review_img=make_image_file()[1],
            category='CATEGORY2'
        )

        Review.objects.create(
            author=profile_user3,
            restaurant=restaurant,
            menu=menu,
            content='TEST_CONTENT3',
            rating=5,
            category='CATEGORY3'
        )

        Review.objects.create(
            author=profile_user3,
            restaurant=restaurant,
            menu=menu,
            content='TEST_CONTENT4',
            rating=5,
            review_img=make_image_file()[1],
            category='CATEGORY4'
        )

    """
    test review_list
    """
    def test_get_review_list_success(self):
        """
        GET review list must success only in this case:
        after login
        """
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/review/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('TEST_CONTENT', response.content.decode())
    def test_get_review_list_fail(self):
        """
        GET review list must fail in this case:
        before login
        """
        client = Client()
        response = client.get('/api/review/')
        self.assertEqual(response.status_code, 401)
    def test_post_review_list_success(self):
        """
        POST review list must success only in this case:
        after login
        """
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.post('/api/review/', json.dumps({
            'content': 'TEST_NEW_CONTENT. It was spicy.',
            'restaurant_name': 'TEST_REST',
            'placeid': 'TEST_PLACE_ID',
            'menu_name': 'TEST_MENU',
            'rating': 5,
            'longitude': 0,
            'latitude': 0,
            'category': 'NEW_CATEGORY',
        }), 'application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Review.objects.count(), 5)
        
        # retaurant should be distinguished by place id
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['restaurant'], 'TEST_REST')
        self.assertEqual(bodys['longitude'], 15)
        self.assertEqual(bodys['latitude'], 15)
        self.assertEqual(bodys['placeid'], 'TEST_PLACE_ID')
        self.assertEqual(Restaurant.objects.count(), 1)
        self.assertEqual(Profile.objects.get(nickname='user1').count_write, 1)
        response = client.post('/api/review/', json.dumps({
            'content': 'TEST_NEW_CONTENT3',
            'restaurant_name': 'TEST_REST3',
            'menu_name': 'TEST_MENU3',
            'rating': 5,
            'longitude': 15.5,
            'latitude': 15.5,
            'placeid': 'TEST_PLACE_ID_3',
            'category': 'NEW_CATEGORY3',
        }), 'application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Review.objects.count(), 6)

        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['restaurant'], 'TEST_REST3')
        self.assertEqual(bodys['longitude'], 15.5)
        self.assertEqual(bodys['latitude'], 15.5)
        self.assertEqual(bodys['placeid'], 'TEST_PLACE_ID_3')
        self.assertEqual(Restaurant.objects.count(), 2)
        self.assertEqual(Profile.objects.get(nickname='user1').count_write, 2)
        # restaurant should not be added when name just changed
        response = client.post('/api/review/', json.dumps({
            'content': 'TEST_NEW_CONTENT. It was spicy.',
            'restaurant_name': 'TEST_RESTAA',
            'placeid': 'TEST_PLACE_ID',
            'menu_name': 'TEST_MENU',
            'rating': 5,
            'longitude': 0,
            'latitude': 0,
            'category': 'NEW_CATEGORY',
        }), 'application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Review.objects.count(), 7)

        # retaurant should be distinguished by place id
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['restaurant'], 'TEST_REST')
        self.assertEqual(bodys['longitude'], 15)
        self.assertEqual(bodys['latitude'], 15)
        self.assertEqual(bodys['placeid'], 'TEST_PLACE_ID')
        self.assertEqual(Restaurant.objects.count(), 2)
        self.assertEqual(Profile.objects.get(nickname='user1').count_write, 3)
    def test_post_review_list_fail(self):
        """
        POST review list must fail in this case:
        before login
        decode error
        """
        client = Client()
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
        """
        Other methods in review list are not allowed
        """
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.put('/api/review/')

        self.assertEqual(response.status_code, 405)
    """
    test review_detail
    """
    def test_get_review_detail_success(self):
        """
        GET review detail should only success in this case:
        proper login
        review should exist
        """
        client = Client()
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        review2_id = Review.objects.get(content='TEST_CONTENT2').id
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/review/'+str(review1_id)+'/')
        self.assertEqual(response.status_code, 200)
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['id'], review1_id)
        self.assertEqual(bodys['author'], 'TEST_USER_1')
        self.assertEqual(bodys['content'], 'TEST_CONTENT')
        self.assertEqual(bodys['restaurant'], 'TEST_REST')
        self.assertEqual(bodys['longitude'], 15)
        self.assertEqual(bodys['latitude'], 15)
        self.assertEqual(bodys['placeid'], 'TEST_PLACE_ID')
        self.assertEqual(bodys['menu'], 'TEST_MENU')
        self.assertEqual(bodys['category'], 'CATEGORY1')
        self.assertEqual(bodys['rating'], 5)
        response = client.get('/api/review/'+str(review2_id)+'/')
        self.assertEqual(response.status_code, 200)
    def test_get_review_detail_fail(self):
        """
        GET review detail should fail in rest of the cases
        """
        client = Client()
        response = client.get('/api/review/1/')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/review/7/')
        self.assertEqual(response.status_code, 404)
    def test_put_review_detail_success(self):
        """
        PUT review detail should only success in this case:
        proper login
        review should exist
        review author should be current user
        proper input
        """
        client = Client()
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        review2_id = Review.objects.get(content='TEST_CONTENT2').id
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        # restaurant should not be added when name just changed
        response = client.put('/api/review/'+str(review1_id)+'/', json.dumps({
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_RESTA',
            'menu_name': 'TEST_MENU',
            'placeid': 'TEST_PLACE_ID',
            'rating': 3,
            'longitude': 0,
            'latitude': 0,
            'category': 'NEW_TEST_CATEGORY'
        }), 'application/json')
        self.assertEqual(response.status_code, 200)
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['id'], review1_id)
        self.assertEqual(bodys['author'], 'TEST_USER_1')
        self.assertEqual(bodys['content'], 'TEST_PUT_CONTENT')
        self.assertEqual(bodys['restaurant'], 'TEST_REST')
        self.assertEqual(bodys['placeid'], 'TEST_PLACE_ID')
        self.assertEqual(bodys['menu'], 'TEST_MENU')
        self.assertEqual(bodys['category'], 'NEW_TEST_CATEGORY')
        self.assertEqual(bodys['rating'], 3)
        response = client.put('/api/review/'+str(review2_id)+'/', json.dumps({
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'placeid': 'TEST_PLACE_ID',
            'rating': 3,
            'longitude': 0,
            'latitude': 0,
            'category': 'NEW_TEST_CATEGORY'
        }), 'application/json')
        self.assertEqual(response.status_code, 200)
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['id'], review2_id)
        self.assertEqual(bodys['author'], 'TEST_USER_1')
        self.assertEqual(bodys['content'], 'TEST_PUT_CONTENT')
        self.assertEqual(bodys['rating'], 3)
        self.assertEqual(bodys['restaurant'], 'TEST_REST')
        self.assertEqual(bodys['placeid'], 'TEST_PLACE_ID')
        self.assertEqual(bodys['menu'], 'TEST_MENU')
        self.assertEqual(bodys['category'], 'NEW_TEST_CATEGORY')
        response = client.put('/api/review/'+str(review1_id)+'/', json.dumps({
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST_N',
            'menu_name': 'TEST_MENU_N',
            'placeid': 'TEST_PLACE_ID_N',
            'rating': 3,
            'longitude': 15.5,
            'latitude': 15.5,
            'category': 'NEW_TEST_CATEGORY'
        }), 'application/json')
        self.assertEqual(response.status_code, 200)
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['id'], review1_id)
        self.assertEqual(bodys['content'], 'TEST_PUT_CONTENT')
        self.assertEqual(bodys['rating'], 3)
        self.assertEqual(bodys['restaurant'], 'TEST_REST_N')
        self.assertEqual(bodys['placeid'], 'TEST_PLACE_ID_N')
        self.assertEqual(bodys['menu'], 'TEST_MENU_N')
        self.assertEqual(bodys['category'], 'NEW_TEST_CATEGORY')
        self.assertEqual(bodys['longitude'], 15.5)
        self.assertEqual(bodys['latitude'], 15.5)
        self.assertEqual(Restaurant.objects.count(), 2)
        self.assertEqual(Menu.objects.count(), 2)
    def test_put_review_detail_fail(self):
        """
        PUT review detail should fail in rest of the cases
        """
        client = Client()
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        review2_id = Review.objects.get(content='TEST_CONTENT2').id
        review3_id = Review.objects.get(content='TEST_CONTENT3').id
        review4_id = Review.objects.get(content='TEST_CONTENT4').id
        no_review_id = review1_id + review2_id + review3_id + review4_id
        response = client.put('/api/review/'+str(review1_id)+'/', {
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'rating': 3
        }, 'application/json')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_2',
                     email='TEST_EMAIL_2', password='TEST_PW_2')
        response = client.put('/api/review/'+str(review1_id)+'/', {
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'rating': 3
        }, 'application/json')
        self.assertEqual(response.status_code, 403)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.put('/api/review/'+str(review1_id)+'/', {
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'rating': 3
        })
        self.assertEqual(response.status_code, 400)
        response = client.put('/api/review/'+str(no_review_id)+'/', {
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST',
            'menu_name': 'TEST_MENU',
            'rating': 3
        }, 'application/json')
        self.assertEqual(response.status_code, 404)
        response = client.put('/api/review/'+str(review1_id)+'/', json.dumps({
            'content': 'TEST_PUT_CONTENT',
            'restaurant_name': 'TEST_REST_N',
            'menu_name': 'TEST_MENU_N',
            'rating': 3,
            'category': 'NEW_TEST_CATEGORY'
        }), 'application/json')
        self.assertEqual(response.status_code, 400)
    def test_delete_review_success(self):
        """
        DELETE review detail should only success in this case:
        proper login
        review should exist
        review author should be current user
        """
        client = Client()
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        review2_id = Review.objects.get(content='TEST_CONTENT2').id
        review3_id = Review.objects.get(content='TEST_CONTENT3').id
        review4_id = Review.objects.get(content='TEST_CONTENT4').id
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.delete('/api/review/'+str(review1_id)+'/')
        response = client.delete('/api/review/'+str(review2_id)+'/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Review.objects.count(), 2)
        client.login(username='TEST_USER_3',
                     email='TEST_EMAIL_3', password='TEST_PW_3')
        response = client.delete('/api/review/'+str(review3_id)+'/')
        response = client.delete('/api/review/'+str(review4_id)+'/')
        self.assertEqual(Review.objects.count(), 0)
    def test_delete_review_fail(self):
        """
        DELETE review detail should fail in rest of the cases
        """
        client = Client()
        response = client.delete('/api/review/1/')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_2',
                     email='TEST_EMAIL_2', password='TEST_PW_2')
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        review2_id = Review.objects.get(content='TEST_CONTENT2').id
        review3_id = Review.objects.get(content='TEST_CONTENT3').id
        no_review_id = review1_id + review2_id + review3_id
        response = client.delete('/api/review/'+str(review1_id)+'/')
        self.assertEqual(response.status_code, 403)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.delete('/api/review/'+str(no_review_id)+'/')
        self.assertEqual(response.status_code, 404)

    def test_review_detail_other_method_not_allowed(self):
        """
        Other methods in review detail are not allowed
        """
        client = Client()
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.post('/api/review/1/')
        self.assertEqual(response.status_code, 405)

    """
    test friend_review_list
    """
    def test_get_friend_review_list_success(self):
        """
        GET friend's review list should only be succes in this case:
        proper login
        friend with friend_id exist
        """
        client = Client()
        user3_id = Profile.objects.get(nickname='user3').id
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/friend/'+str(user3_id)+'/review/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('TEST_CONTENT3', response.content.decode())
    def test_get_friend_review_list_fail(self):
        """
        GET friend's review list should fail in rest of the cases
        """
        client = Client()
        user1_id = Profile.objects.get(nickname='user1').id
        user2_id = Profile.objects.get(nickname='user2').id
        user3_id = Profile.objects.get(nickname='user3').id
        no_user_id = user1_id + user2_id + user3_id
        response = client.get('/api/friend/'+str(user3_id)+'/review/')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/friend/'+str(user2_id)+'/review/')
        self.assertEqual(response.status_code, 403)
        response = client.get('/api/friend/'+str(no_user_id)+'/review/')
        self.assertEqual(response.status_code, 404)
    def test_friend_list_other_method_not_allowed(self):
        """
        Other methods in friend review list are not allowed
        """
        client = Client()
        user3_id = Profile.objects.get(nickname='user3').id
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.put('/api/friend/'+str(user3_id)+'/review/')
        self.assertEqual(response.status_code, 405)

    """
    test friend_review_detail
    """

    def test_get_friend_review_detail_success(self):
        """
        GET friend's review detail should only be succes in this case:
        proper login
        friend with friend_id exist
        review with review_id exist
        """
        client = Client()
        user1_id = Profile.objects.get(nickname='user1').id
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        review2_id = Review.objects.get(content='TEST_CONTENT2').id
        client.login(username='TEST_USER_3',
                     email='TEST_EMAIL_3', password='TEST_PW_3')
        response = client.get('/api/friend/'+str(user1_id)+'/review/'+str(review1_id)+'/')
        self.assertEqual(response.status_code, 200)
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['id'], review1_id)
        self.assertEqual(bodys['author'], 'TEST_USER_1')
        self.assertEqual(bodys['content'], 'TEST_CONTENT')
        self.assertEqual(bodys['restaurant'], 'TEST_REST')
        self.assertEqual(bodys['longitude'], 15)
        self.assertEqual(bodys['latitude'], 15)
        self.assertEqual(bodys['placeid'], 'TEST_PLACE_ID')
        self.assertEqual(bodys['menu'], 'TEST_MENU')
        self.assertEqual(bodys['category'], 'CATEGORY1')
        self.assertEqual(bodys['rating'], 5)
        response = client.get('/api/friend/'+str(user1_id)+'/review/'+str(review2_id)+'/')
        self.assertEqual(response.status_code, 200)
        bodys = json.loads(response.content.decode())
        self.assertEqual(bodys['id'], review2_id)
    def test_get_friend_review_detail_fail(self):
        """
        GET friend's review detail should fail in rest of the cases
        """
        client = Client()
        user1_id = Profile.objects.get(nickname='user1').id
        user2_id = Profile.objects.get(nickname='user2').id
        user3_id = Profile.objects.get(nickname='user3').id
        no_user_id = user1_id + user2_id + user3_id
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        review2_id = Review.objects.get(content='TEST_CONTENT2').id
        review3_id = Review.objects.get(content='TEST_CONTENT3').id
        review4_id = Review.objects.get(content='TEST_CONTENT4').id
        no_review_id = review1_id + review2_id + review3_id + review4_id
        response = client.get('/api/friend/'+str(user1_id)+'/review/'+str(review1_id)+'/')
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_3',
                     email='TEST_EMAIL_3', password='TEST_PW_3')
        response = client.get('/api/friend/'+str(user2_id)+'/review/'+str(review1_id)+'/')
        self.assertEqual(response.status_code, 403)
        response = client.get('/api/friend/'+str(user1_id)+'/review/'+str(no_review_id)+'/')
        self.assertEqual(response.status_code, 404)
        response = client.get('/api/friend/'+str(no_user_id)+'/review/'+str(review3_id)+'/')
        self.assertEqual(response.status_code, 404)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/friend/'+str(user3_id)+'/review/'+str(review1_id)+'/')
        self.assertEqual(response.status_code, 403)
    def test_friend_review_detail_other_method_not_allowed(self):
        """
        Other methods in friend review detail are not allowed
        """
        client = Client()
        user1_id = Profile.objects.get(nickname='user1').id
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        client.login(username='TEST_USER_3',
                     email='TEST_EMAIL_3', password='TEST_PW_3')
        response = client.put('/api/friend/'+str(user1_id)+'/review/'+str(review1_id)+'/')
        self.assertEqual(response.status_code, 405)

    def test_image_success(self):
        """
        GET friend's review detail should only be succes in this case:
        proper login
        review with review_id exist
        review author should be current user
        proper input format: multipart/form-data
        """
        client = Client()
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        img_and_file = make_image_file()

        response = client.post('/api/review/'+str(review1_id)+'/image/',
                               data={'image': img_and_file[1]})
        self.assertEqual(response.status_code, 200)

    def test_image_fail(self):
        """
        GET friend's review detail should fail in rest of the cases
        """
        client = Client()
        review1_id = Review.objects.get(content='TEST_CONTENT').id
        review2_id = Review.objects.get(content='TEST_CONTENT2').id
        review3_id = Review.objects.get(content='TEST_CONTENT3').id
        review4_id = Review.objects.get(content='TEST_CONTENT4').id
        no_review_id = review1_id + review2_id + review3_id + review4_id

        img_and_file = make_image_file()
        response = client.post('/api/review/'+str(review1_id)+'/image/',
                               data={'image': img_and_file[1]})
        self.assertEqual(response.status_code, 401)
        client.login(username='TEST_USER_2',
                     email='TEST_EMAIL_2', password='TEST_PW_2')
        response = client.post('/api/review/'+str(review1_id)+'/image/',
                               data={'image': img_and_file[1]})
        self.assertEqual(response.status_code, 403)
        response = client.post('/api/review/'+str(no_review_id)+'/image/',
                               data={'image': img_and_file[1]})
        self.assertEqual(response.status_code, 404)
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/review/'+str(review1_id)+'/image/')
        self.assertEqual(response.status_code, 405)
        response = client.post('/api/review/'+str(review1_id)+'/image/',
                               data={'image': img_and_file[0].tobytes()})
        self.assertEqual(response.status_code, 400)

    def test_get_restaurant_review_list_success(self):
        """
        GET restaurant review list should success
        """
        client = Client()
        res_id = Restaurant.objects.get(name='TEST_REST').id
        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.get('/api/restaurant/'+str(res_id)+'/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('TEST_CONTENT3', response.content.decode())
        response = client.get('/api/restaurant/'+str(res_id+1)+'/')
        self.assertEqual(response.json(), [])

    def test_get_restaurant_review_list_fail(self):
        """
        GET restaurant review list should fail in rest of the cases
        """
        client = Client()
        res_id = Restaurant.objects.get(name='TEST_REST').id
        response = client.get('/api/restaurant/'+str(res_id)+'/')
        self.assertEqual(response.status_code, 401)

    def test_restaurant_review_list_other_method_not_allowed(self):
        """
        Other methods in restaurant review list are not allowed
        """
        client = Client()
        res_id = Restaurant.objects.get(name='TEST_REST').id

        client.login(username='TEST_USER_1',
                     email='TEST_EMAIL_1', password='TEST_PW_1')
        response = client.post('/api/restaurant/'+str(res_id)+'/')
        self.assertEqual(response.status_code, 405)
