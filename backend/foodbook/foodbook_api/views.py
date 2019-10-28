from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Profile, Review, Menu, Restaurant
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound
from django.contrib.auth import logout, authenticate, login
from django.core.exceptions import ObjectDoesNotExist
import json
from json import JSONDecodeError
# Create your views here.


def signup(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            phone_number = req_data['phone_number']
            email = req_data['email']
            age = req_data['age']
            gender = req_data['gender']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(content=str(e))
        user = User.objects.create_user(
            username=username, password=password, email=email)
        new_profile = Profile.objects.create(
            user=user,
            age=age,
            gender=gender,
            phone_number=phone_number,
        )
        profile_of_user = new_profile
        response_dict = {
            'username': profile_of_user.user.username,
            'email': profile_of_user.user.email,
            'phone_number': profile_of_user.phone_number,
            'age': profile_of_user.age,
            'gender': profile_of_user.gender,
            'number_of_reviews': profile_of_user.count_write,
            'number_of_friends': profile_of_user.count_friend,
            'friends': []
        }
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['POST'])


def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(content=str(e))
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

def signout(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

def user(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        profile_of_user = request.user.profile
        info_of_user = {
            'username': profile_of_user.user.username,
            'phone_number': profile_of_user.phone_number,
            'email': profile_of_user.user.email,
            'age': profile_of_user.age,
            'gender': profile_of_user.gender,
            'number_of_reviews': profile_of_user.count_write,
            'number_of_friends': profile_of_user.count_friend,
            'friends': [friend.user.username for friend in profile_of_user.friend.all().values()]
        }
        return JsonResponse(info_of_user)
    elif request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            phone_number = req_data['phone_number']
            password = req_data['password']
            email = req_data['email']
            age = req_data['age']
            gender = req_data['gender']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(content=str(e))
        request.user.username = username
        request.user.password = password
        request.user.email = email
        request.user.profile.age = age
        request.user.profile.gender = gender
        request.user.save()
        request.user.profile.save()
        profile_of_user = request.user.profile
        response_dict = {
            'username': profile_of_user.user.username,
            'phone_number': profile_of_user.phone_number,
            'email': profile_of_user.user.email,
            'age': profile_of_user.age,
            'gender': profile_of_user.gender,
            'number_of_reviews': profile_of_user.count_write,
            'number_of_friends': profile_of_user.count_friend,
            'friends': [friend.user.username for friend in profile_of_user.friend.all().values()]
        }
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


def review_list(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        review_all_list = [
            review for review in Review.objects.filter(user=request.user).values()]
        return JsonResponse(review_all_list, safe=False)
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            restaurant_name = req_data['restaurant']
            menu_name = req_data['menu']
            content = req_data['content']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(content=str(e))
        if len(req_data.keys()) > 3:
            return HttpResponseBadRequest(content="improper format")
        restaurant = Restaurant.objects.get(name=restaurant_name)
        menu = Menu.objects.get(name=menu_name)
        new_review = Review.objects.create(
            author=request.user, restaurant=restaurant, menu=menu)
        dict_new_review = {
            'id': new_review.id,
            'author': new_review.author.id,
            'restaurant': new_review.restaurant.id,
            'menu': new_review.menu.id,
            'content': new_review.content}
        return JsonResponse(dict_new_review, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def review_detail(request):
    if request.method != 'GET' and request.method != 'PUT' and request.method != 'DELETE':
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    try:
        review = Review.objects.get(pk=article_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        review_dict = dict_new_review = {
                'id': review.id,
                'author': review.author.id,
                'restaurant': review.restaurant.id,
                'menu': review.menu.id,
                'content': review.content
            }
        return JsonResponse(review_dict)
    
    else:
        if request.user.pk == article.author.pk:
            if request.method == 'PUT':
                try:
                    # editting restaurant or menu is non-sense
                    req_data = json.loads(request.body.decode())
                    review.content = req_data['content']
                    review.save()

                    review_dict = {
                        'id': review.id,
                        'author': review.author.id,
                        'restaurant': review.restaurant.id,
                        'menu': review.menu.id,
                        'content': review.content
                    }

                    return JsonResponse(review_dict)

                except:
                    return HttpResponseBadRequest()

            # request.method == 'DELETE'
            else:
                review.delete()
                return HttpResponse(status=200)

        else:
            return HttpResponseForbidden()
