from django.shortcuts import render
from django.contrib.auth.models import User
from ..models import Profile, Review, Menu, Restaurant
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth import logout, authenticate, login
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