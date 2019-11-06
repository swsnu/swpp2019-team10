'''
views for reviews
'''
# pylint: disable=line-too-long, unnecessary-comprehension, pointless-string-statement
# pylint: disable=E0402, R0911, R0914
import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound
from django.core.exceptions import ObjectDoesNotExist
from ..models import Profile, Review, Menu, Restaurant, ReviewForm
# pylint: enable=E0402
# pylint: enable=line-too-long

def review_list(request):
    """
    review list
    GET, POST method are allowed
    """
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        review_all_list = []
        for review in Review.objects.filter(author=request.user.profile):
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
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            restaurant_name = req_data['restaurant_name']
            menu_name = req_data['menu_name']
            content = req_data['content']
            rating = req_data['rating']
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
                )
            else:
                restaurant = Restaurant.objects.create(
                    name=restaurant_name,
                    longitude=0,
                    latitude=0,
                )
        try:
            menu = Menu.objects.get(name=menu_name)
        except:
            """
            this is dummy!
            """
            menu = Menu.objects.create(
                name=menu_name,
            )
        new_review = Review.objects.create(
            author=request.user.profile,
            restaurant=restaurant,
            menu=menu,
            content=content,
            rating=rating,
            )
        request.user.profile.count_write += 1
        request.user.profile.save()
        dict_new_review = {
            'id': new_review.id,
            'author': new_review.author.user.username,
            'restaurant': new_review.restaurant.name,
            'menu': new_review.menu.name,
            'content': new_review.content,
            'rating': new_review.rating,
            'date': new_review.date.strftime("%Y-%m-%d")
            }
        return JsonResponse(dict_new_review, status=201)
    #else:
    return HttpResponseNotAllowed(['GET', 'POST'])


def review_detail(request, review_id):
    """
    review detail
    GET, PUT, DELETE methods are allowed
    """
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        try:
            review = Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
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
            'image': image_path
        }
        return JsonResponse(review_dict)
    if request.method == 'PUT':
        try:
            review = Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if request.user.profile.id != review.author.id:
            return HttpResponse(status=403)
        try:
            req_data = json.loads(request.body.decode())
            restaurant_name = req_data['restaurant_name']
            menu_name = req_data['menu_name']
            content = req_data['content']
            rating = req_data['rating']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        restaurant = Restaurant.objects.get(name=restaurant_name)
        menu = Menu.objects.get(name=menu_name)
        review.restaurant = restaurant
        review.menu = menu
        review.content = content
        review.rating = rating
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
            'image': image_path
        }
        return JsonResponse(dict_review)
    if request.method == 'DELETE':
        try:
            review = Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if request.user.profile.id != review.author.id:
            return HttpResponse(status=403)
        review.delete()
        request.user.profile.count_write -= 1
        request.user.profile.save()
        return HttpResponse(status=200)
    #else:
    return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

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
        for review in Review.objects.filter(author=friend):
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
            'image': image_path
        }
        return JsonResponse(review_dict)
    #else:
    return HttpResponseNotAllowed(['GET'])


def review_image(request, review_id):
    """
    put image on review by this function
    only POST method allowed
    """
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        review = Review.objects.get(id=review_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()
    if request.user.profile.id != review.author.id:
        return HttpResponse(status=403)
    if request.method == 'POST':
        form = ReviewForm(request.POST, request.FILES, instance=review)
        if form.is_valid():
            review.review_img = request.FILES['image']
            review.save()
            dict_review = {
                'id': review.id,
                'author': review.author.user.username,
                'restaurant': review.restaurant.name,
                'menu': review.menu.name,
                'content': review.content,
                'rating': review.rating,
                'date': review.date.strftime("%Y-%m-%d"),
                'image': 'http://127.0.0.1:8000'+review.review_img.url
            }
            return JsonResponse(dict_review)
        #else:
        return HttpResponseBadRequest(content="invalid form")
    #else:
    return HttpResponseNotAllowed(['POST'])
