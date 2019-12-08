'''
views for reviews
'''
# pylint: disable=line-too-long, unnecessary-comprehension, pointless-string-statement
# pylint: disable=E0402, R0911, R0912, R0914, W0702, R0915
import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from ..models import Profile, Review, Menu, Restaurant, ReviewForm, Tag
from ..algorithms.tagging import Tagging
# pylint: enable=E0402
# pylint: enable=line-too-long
@transaction.atomic
def review_list(request):
    """
    review list
    GET, POST method are allowed
    """
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        review_all_list = []
        for review in Review.objects.select_related(
                'restaurant', 'menu').prefetch_related('tag').filter(author=request.user.profile):
            image_path = ""
            if review.review_img:
                image_path = 'http://127.0.0.1:8000'+review.review_img.url
            tag = []
            for tag_item in review.tag.all():
                pos = 0
                if tag_item.sentimental >= 0.6:
                    pos = 1
                if tag_item.sentimental <= 0.4:
                    pos = -1
                tag.append({'name':tag_item.name, 'sentimental': pos})
            dict_review = {
                'id': review.id,
                'author': request.user.username,
                'restaurant': review.restaurant.name,
                'menu': review.menu.name,
                'content': review.content,
                'rating': review.rating,
                'image': image_path,
                'date': review.date.strftime("%Y-%m-%d"),
                'tag': tag
                }
            review_all_list.append(dict_review)
        return JsonResponse(review_all_list, safe=False)
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            restaurant_name = req_data['restaurant_name']
            menu_name = req_data['menu_name']
            content = req_data['content']
            rating = req_data['rating']
            category = req_data['category']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        try:
            longitude = req_data['longitude']
            latitude = req_data['latitude']
            is_location_exist = True
        except (KeyError, JSONDecodeError):
            is_location_exist = False
        try:
            restaurant = Restaurant.objects.get(name=restaurant_name)
        except:
            """
            this is dummy!
            """
            if is_location_exist:
                restaurant = Restaurant.objects.create(
                    name=restaurant_name,
                    longitude=longitude,
                    latitude=latitude,
                    rating=rating,
                )
            else:
                restaurant = Restaurant.objects.create(
                    name=restaurant_name,
                    longitude=0,
                    latitude=0,
                    rating=rating,
                )
        num_of_review = restaurant.review_list.all().count()
        restaurant.rating = (restaurant.rating * num_of_review + rating)
        restaurant.rating = restaurant.rating / (num_of_review + 1)
        restaurant.save()
        try:
            menu = restaurant.menu_list.all()
            menu = menu.get(name=menu_name)
        except:
            """
            this is dummy!
            """
            menu = Menu.objects.create(
                name=menu_name,
                restaurant=restaurant,
            )
        new_review = Review.objects.create(
            author=request.user.profile,
            restaurant=restaurant,
            menu=menu,
            content=content,
            rating=rating,
            category=category
            )
        tags = Tagging(request.user.profile, menu, rating).tagging(content)
        for item in tags.keys():
            new_review.tag.add(Tag.objects.create(name=item, sentimental=tags[item]))
        tag = []
        for tag_item in new_review.tag.all():
            pos = 0
            if tag_item.sentimental >= 0.6:
                pos = 1
            if tag_item.sentimental <= 0.4:
                pos = -1
            tag.append({'name': tag_item.name, 'sentimental': pos})
        dict_new_review = {
            'id': new_review.id,
            'author': request.user.username,
            'restaurant': restaurant.name,
            'menu': menu.name,
            'content': new_review.content,
            'rating': new_review.rating,
            'date': new_review.date.strftime("%Y-%m-%d"),
            'tag': tag,
            'category': new_review.category
            }
        return JsonResponse(dict_new_review, status=201)
    #else:
    return HttpResponseNotAllowed(['GET', 'POST'])


@transaction.atomic
def review_detail(request, review_id):
    """
    review detail
    GET, PUT, DELETE methods are allowed
    """
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        try:
            review = Review.objects.select_related(
                'author__user', 'restaurant', 'menu').prefetch_related('tag').get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        image_path = ""
        if review.review_img:
            image_path = 'http://127.0.0.1:8000'+review.review_img.url
        tag = []
        for tag_item in review.tag.all():
            pos = 0
            if tag_item.sentimental >= 0.6:
                pos = 1
            if tag_item.sentimental <= 0.4:
                pos = -1
            tag.append({'name':tag_item.name, 'sentimental': pos})
        review_dict = {
            'id': review.id,
            'author': review.author.user.username,
            'restaurant': review.restaurant.name,
            'menu': review.menu.name,
            'content': review.content,
            'rating': review.rating,
            'date': review.date.strftime("%Y-%m-%d"),
            'category': review.category,
            'image': image_path,
            'tag': tag
        }
        return JsonResponse(review_dict)
    if request.method == 'PUT':
        try:
            review = Review.objects.select_related(
                'author__user', 'restaurant', 'menu').get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if request.user.id != review.author.user.id:
            return HttpResponse(status=403)
        try:
            req_data = json.loads(request.body.decode())
            restaurant_name = req_data['restaurant_name']
            menu_name = req_data['menu_name']
            content = req_data['content']
            rating = req_data['rating']
            category = req_data['category']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        try:
            longitude = req_data['longitude']
            latitude = req_data['latitude']
            is_location_exist = True
        except (KeyError, JSONDecodeError):
            is_location_exist = False
        try:
            restaurant = Restaurant.objects.get(name=restaurant_name)
        except:
            if is_location_exist:
                restaurant = Restaurant.objects.create(
                    name=restaurant_name,
                    longitude=longitude,
                    latitude=latitude,
                    rating=rating,
                )
            else:
                return HttpResponseBadRequest()
        try:
            menu = Menu.objects.get(name=menu_name)
        except:
            menu = Menu.objects.create(
                name=menu_name,
                restaurant=restaurant,
            )
        review.restaurant = restaurant
        review.menu = menu
        review.content = content
        review.rating = rating
        review.category = category
        review.save()
        image_path = ""
        if review.review_img:
            image_path = 'http://127.0.0.1:8000'+review.review_img.url
        dict_review = {
            'id': review.id,
            'author': review.author.user.username,
            'restaurant': review.restaurant.name,
            'menu': review.menu.name,
            'content': review.content,
            'rating': review.rating,
            'date': review.date.strftime("%Y-%m-%d"),
            'category': review.category,
            'image': image_path
        }
        return JsonResponse(dict_review)
    if request.method == 'DELETE':
        try:
            review = Review.objects.select_related('author__user').get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if request.user.id != review.author.user.id:
            return HttpResponse(status=403)
        review.menu.num_of_review -= 1
        review.menu.save()
        if review.menu.num_of_review == 0:
            review.menu.delete()
        review.delete()
        request.user.profile.count_write -= 1
        request.user.profile.save()
        return HttpResponse(status=200)
    #else:
    return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])


@transaction.atomic
def friend_review_list(request, friend_id):
    """
    friend review list
    only GET mothod allowed
    """
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        friend = Profile.objects.get(id=friend_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()
    if friend not in request.user.profile.friend.all():
        return HttpResponse(status=403)
    if request.method == 'GET':
        review_all_list = []
        for review in Review.objects.select_related(
                'author__user', 'restaurant', 'menu').filter(author=friend):
            image_path = ""
            if review.review_img:
                image_path = 'http://127.0.0.1:8000'+review.review_img.url
            dict_review = {
                'id': review.id,
                'author': review.author.user.username,
                'restaurant': review.restaurant.name,
                'menu': review.menu.name,
                'content': review.content,
                'rating': review.rating,
                'image': image_path,
                'date': review.date.strftime("%Y-%m-%d")
                }
            review_all_list.append(dict_review)
        return JsonResponse(review_all_list, safe=False)
    #else:
    return HttpResponseNotAllowed(['GET'])


@transaction.atomic
def friend_review_detail(request, friend_id, review_id):
    """
    friend review detail
    only GET mothod allowed
    """
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        friend = Profile.objects.get(id=friend_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()
    if friend not in request.user.profile.friend.all():
        return HttpResponse(status=403)
    if request.method == 'GET':
        try:
            review = Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if review.author.id != friend_id:
            return HttpResponse(status=403)
        image_path = ""
        if review.review_img:
            image_path = 'http://127.0.0.1:8000'+review.review_img.url
        review_dict = {
            'id': review.id,
            'author': review.author.user.username,
            'restaurant': review.restaurant.name,
            'menu': review.menu.name,
            'content': review.content,
            'rating': review.rating,
            'date': review.date.strftime("%Y-%m-%d"),
            'category': review.category,
            'image': image_path
        }
        return JsonResponse(review_dict)
    #else:
    return HttpResponseNotAllowed(['GET'])


@transaction.atomic
def review_image(request, review_id):
    """
    put image on review by this function
    only POST method allowed
    """
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        review = Review.objects.select_related(
            'author__user', 'restaurant', 'menu').prefetch_related('tag').get(id=review_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()
    if request.user.profile.id != review.author.id:
        return HttpResponse(status=403)
    if request.method == 'POST':
        form = ReviewForm(request.POST, request.FILES, instance=review)
        if form.is_valid():
            review.review_img = request.FILES['image']
            review.save()
            tag = []
            for tag_item in review.tag.all():
                pos = 0
                if tag_item.sentimental >= 0.6:
                    pos = 1
                if tag_item.sentimental <= 0.4:
                    pos = -1
                tag.append({'name':tag_item.name, 'sentimental': pos})
            dict_review = {
                'id': review.id,
                'author': review.author.user.username,
                'restaurant': review.restaurant.name,
                'menu': review.menu.name,
                'content': review.content,
                'rating': review.rating,
                'date': review.date.strftime("%Y-%m-%d"),
                'category': review.category,
                'image': 'http://127.0.0.1:8000'+review.review_img.url,
                'tag': tag
            }
            return JsonResponse(dict_review)
        #else:
        return HttpResponseBadRequest(content="invalid form")
    #else:
    return HttpResponseNotAllowed(['POST'])

@transaction.atomic
def restaurant_review_list(request, restaurant_id):
    """
    restaurant review list
    GET method are allowed
    """
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        review_all_list = []
        restaurant_reviews = Review.objects.select_related(
            'restaurant', 'menu').prefetch_related('tag').filter(restaurant__id=restaurant_id)
        for review in restaurant_reviews:
            image_path = ""
            if review.review_img:
                image_path = 'http://127.0.0.1:8000'+review.review_img.url
            tag = []
            for tag_item in review.tag.all():
                pos = 0
                if tag_item.sentimental >= 0.6:
                    pos = 1
                if tag_item.sentimental <= 0.4:
                    pos = -1
                tag.append({'name':tag_item.name, 'sentimental': pos})
            dict_review = {
                'id': review.id,
                'author': request.user.username,
                'restaurant': review.restaurant.name,
                'menu': review.menu.name,
                'content': review.content,
                'rating': review.rating,
                'image': image_path,
                'date': review.date.strftime("%Y-%m-%d"),
                'tag': tag
                }
            review_all_list.append(dict_review)
        return JsonResponse(review_all_list, safe=False)
    return HttpResponseNotAllowed(['GET'])
