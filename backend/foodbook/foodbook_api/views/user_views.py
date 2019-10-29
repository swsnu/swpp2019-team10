from django.shortcuts import render
from django.contrib.auth.models import User
from ..models import Profile, Review, Menu, Restaurant
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound, HttpResponseForbidden
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
            age = req_data['age']
            gender = req_data['gender']
            profile_pic = req_data['profile_pic']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(content=str(e))
        user = User.objects.create_user(
            username=username, password=password)
        new_profile = Profile.objects.create(
            user=user,
            phone_number=phone_number,
            age=age,
            gender=gender,
            profile_pic=profile_pic,
        )
        profile_of_user = new_profile
        response_dict = {
            'username': profile_of_user.user.username,
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
            'age': profile_of_user.age,
            'gender': profile_of_user.gender,
            'profile_pic': profile_of_user.profile_pic.path,
            'number_of_reviews': profile_of_user.count_write,
            'number_of_friends': profile_of_user.count_friend,
        }
        return JsonResponse(info_of_user)
    elif request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
            phone_number = req_data['phone_number']
            age = req_data['age']
            gender = req_data['gender']
            profile_pic = req_data['profile_pic']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(content=str(e))
        request.user.profile.phone_number = phone_number
        request.user.profile.age = age
        request.user.profile.gender = gender
        request.user.profile.profile_pic = profile_pic
        request.user.profile.save()
        profile_of_user = request.user.profile
        info_of_user = {
            'username': profile_of_user.user.username,
            'phone_number': profile_of_user.phone_number,
            'age': profile_of_user.age,
            'gender': profile_of_user.gender,
            'profile_pic': profile_of_user.profile_pic.path,
            'number_of_reviews': profile_of_user.count_write,
            'number_of_friends': profile_of_user.count_friend,
        }
        return JsonResponse(info_of_user, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])

def friend(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        profile_of_user = request.user.profile
        info_of_friends = {
            'friends_list': [friend.user.username for friend in profile_of_user.friend.all()]
        }
        return JsonResponse(info_of_friends)
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(content=str(e))
        request.user.profile.friend.append(Profile.objects.get(user.username==username))
        request.user.profile.save()
        info_of_friends = {
            'friends_list': [friend.user.username for friend in profile_of_user.friend.all()]
        }
        return JsonResponse(info_of_friends, status=204)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def friend_detail(request, friend_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        try:
            friend = Profile.objects.get(id=friend_id)
            if friend in request.user.profile.friend.all():
                info_of_friend = {
                    'username': friend.user.username,
                    'phone_number': friend.phone_number,
                    'age': friend.age,
                    'gender': friend.gender,
                    'profile_pic': friend.profile_pic.path,
                    'number_of_reviews': friend.count_write,
                    'number_of_friends': friend.count_friend,
                }
                return JsonResponse(info_of_user)
            else:
                return HttpResponseForbidden()
        except Profile.DoesNotExist:
            return HttpResponseNotFound()
    elif request.method == 'DELETE':
        try:
            friend = Profile.objects.get(id=friend_id)
            if friend in request.user.profile.friend.all():
                request.user.profile.friend.remove(friend)
                request.user.profile.save()
                return HttpResponse(status=200)
            else:
                return HttpResponseForbidden()
        except Profile.DoesNotExist:
            return HttpResponseNotFound()
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])
