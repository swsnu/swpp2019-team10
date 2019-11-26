'''
    views for user model
'''
import json
from json.decoder import JSONDecodeError
from django.db import transaction
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, \
JsonResponse, HttpResponseNotFound
from django.contrib.auth import logout, authenticate, login
from django.core.exceptions import ObjectDoesNotExist
# pylint: disable=relative-beyond-top-level
from ..models import Profile, ProfileForm
# Create your views here.

@transaction.atomic
def signup(request):
    '''
        method to sign up
    '''
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            nickname = req_data['nickname']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        phone_number = None
        age = None
        gender = None
        if 'phone_number' in req_data:
            phone_number = req_data['phone_number']
        if 'age' in req_data:
            age = req_data['age']
        if 'gender' in req_data:
            gender = req_data['gender']
        new_user = User.objects.create_user(
            username=username, password=password)
        new_profile = Profile.objects.create(
            user=new_user,
            phone_number=phone_number,
            age=age,
            gender=gender,
            nickname=nickname,
        )
        profile_of_user = new_profile
        response_dict = {
            'id': profile_of_user.id,
            'username': profile_of_user.user.username,
            'phone_number': profile_of_user.phone_number,
            'age': profile_of_user.age,
            'gender': profile_of_user.gender,
            'number_of_reviews': profile_of_user.count_write,
            'number_of_friends': profile_of_user.count_friend,
            'nickname': profile_of_user.nickname,
            'friends': []
        }
        return JsonResponse(response_dict, status=200)
    return HttpResponseNotAllowed(['POST'])


@transaction.atomic
def signup_dupcheck(request):
    '''
        method to check if username exists
    '''
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        response_dict = {
            'id': -1
        }
        try:
            user_get = User.objects.get(username=username)
            response_dict['id'] = user_get.profile.id
        except ObjectDoesNotExist:
            pass
        return JsonResponse(response_dict)
    return HttpResponseNotAllowed(['POST'])


@transaction.atomic
def profile_image(request, profile_id):
    '''
        method to upload profile image
    '''
    try:
        profile = Profile.objects.get(id=profile_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            profile.profile_pic = request.FILES.get('profile_pic')
            profile.save()
            dict_profile = {
                'username': profile.user.username,
                'phone_number': profile.phone_number,
                'age': profile.age,
                'gender': profile.gender,
                'profile_pic': profile.profile_pic.path,
                'number_of_reviews': profile.count_write,
                'number_of_friends': profile.count_friend,
                'friends': []
            }
            return JsonResponse(dict_profile, status=201)
        return HttpResponseBadRequest()
    return HttpResponseNotAllowed(['POST'])


@transaction.atomic
def signin(request):
    '''
        method to sign in
    '''
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        curr_user = authenticate(request, username=username, password=password)
        if curr_user is not None:
            login(request, curr_user)
            return HttpResponse(status=204)
        return HttpResponse(status=401)
    return HttpResponseNotAllowed(['POST'])


@transaction.atomic
def signout(request):
    '''
        method to sign out
    '''
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        logout(request)
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])


@transaction.atomic
def user(request):
    '''
        method to manipulating user info
    '''
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        profile_of_user = request.user.profile

        info_of_user = {
            'username': profile_of_user.user.username,
            'phone_number': profile_of_user.phone_number,
            'age': profile_of_user.age,
            'gender': profile_of_user.gender,
            'number_of_reviews': profile_of_user.count_write,
            'number_of_friends': profile_of_user.count_friend,
            'nickname': profile_of_user.nickname,
        }
        if profile_of_user.profile_pic is not None:
            info_of_user['profile_pic'] = profile_of_user.profile_pic.path
        return JsonResponse(info_of_user)
    if request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        if 'nickname' in req_data:
            request.user.profile.nickname = req_data['nickname']
        if 'phone_number' in req_data:
            request.user.profile.phone_number = req_data['phone_number']
        if 'age' in req_data:
            request.user.profile.age = req_data['age']
        if 'gender' in req_data:
            request.user.profile.gender = req_data['gender']
        request.user.profile.save()
        profile_of_user = request.user.profile
        info_of_user = {
            'username': profile_of_user.user.username,
            'phone_number': profile_of_user.phone_number,
            'age': profile_of_user.age,
            'gender': profile_of_user.gender,
            'number_of_reviews': profile_of_user.count_write,
            'number_of_friends': profile_of_user.count_friend,
            'nickname': profile_of_user.nickname,
        }
        if profile_of_user.profile_pic is not None:
            info_of_user['profile_pic'] = profile_of_user.profile_pic.path
        return JsonResponse(info_of_user, status=200)
    return HttpResponseNotAllowed(['GET', 'PUT'])


@transaction.atomic
def friend(request):
    '''
        method to manage friend
    '''
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        profile_of_user = request.user.profile
        info_of_friends = {
            'friends_list': [(friend.id, friend.nickname) \
                            for friend in profile_of_user.friend.all()]
        }
        return JsonResponse(info_of_friends)
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            user_id = req_data['id']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        tmp_user = Profile.objects.get(id=user_id)
        request.user.profile.friend.add(tmp_user)
        request.user.profile.count_friend += 1
        request.user.profile.save()
        profile_of_user = request.user.profile
        info_of_friends = {
            'friends_list': [friend.nickname for friend in profile_of_user.friend.all()]
        }
        return JsonResponse(info_of_friends, status=204)
    return HttpResponseNotAllowed(['GET', 'POST'])


@transaction.atomic
def friend_detail(request, friend_id):
    '''
        method to show friends' detail
    '''
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        try:
            friend_info = Profile.objects.get(id=friend_id)
            info_of_friend = {
                'username': friend_info.user.username,
                'phone_number': friend_info.phone_number,
                'age': friend_info.age,
                'gender': friend_info.gender,
                'number_of_reviews': friend_info.count_write,
                'number_of_friends': friend_info.count_friend,
                'nickname': friend_info.nickname,
            }
            if friend_info.profile_pic is not None:
                info_of_friend['profile_pic'] = friend_info.profile_pic.path
            return JsonResponse(info_of_friend)
        except Profile.DoesNotExist:
            return HttpResponseNotFound()
    elif request.method == 'DELETE':
        try:
            friend_info = Profile.objects.get(id=friend_id)
            request.user.profile.friend.remove(friend_info)
            request.user.profile.count_friend -= 1
            request.user.profile.save()
            return HttpResponse(status=200)
        except Profile.DoesNotExist:
            return HttpResponseNotFound()
    return HttpResponseNotAllowed(['GET', 'DELETE'])
