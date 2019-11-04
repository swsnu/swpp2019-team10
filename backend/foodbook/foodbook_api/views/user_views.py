'''
    views for user model
'''
import json
from json.decoder import JSONDecodeError
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, \
JsonResponse, HttpResponseNotFound
from django.contrib.auth import logout, authenticate, login
from django.core.exceptions import ObjectDoesNotExist
# pylint: disable=relative-beyond-top-level
from ..models import Profile, ProfileForm
# Create your views here.


def signup(request):
    '''
        method to sign up
    '''
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            phone_number = req_data['phone_number']
            age = req_data['age']
            gender = req_data['gender']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        new_user = User.objects.create_user(
            username=username, password=password)
        new_profile = Profile.objects.create(
            user=new_user,
            phone_number=phone_number,
            age=age,
            gender=gender,
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
    return HttpResponseNotAllowed(['POST'])

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
            'profile_pic': profile_of_user.profile_pic.path,
            'number_of_reviews': profile_of_user.count_write,
            'number_of_friends': profile_of_user.count_friend,
        }
        return JsonResponse(info_of_user)
    if request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
            phone_number = req_data['phone_number']
            age = req_data['age']
            gender = req_data['gender']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        request.user.profile.phone_number = phone_number
        request.user.profile.age = age
        request.user.profile.gender = gender
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
    return HttpResponseNotAllowed(['GET', 'PUT'])

def friend(request):
    '''
        method to manage friend
    '''
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        profile_of_user = request.user.profile
        info_of_friends = {
            'friends_list': [(friend.id, friend.user.username) \
                            for friend in profile_of_user.friend.all()]
        }
        return JsonResponse(info_of_friends)
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
        except (KeyError, JSONDecodeError) as err:
            return HttpResponseBadRequest(content=str(err))
        tmp_user = User.objects.get(username=username)
        request.user.profile.friend.add(tmp_user.profile)
        request.user.profile.count_friend += 1
        request.user.profile.save()
        profile_of_user = request.user.profile
        info_of_friends = {
            'friends_list': [friend.user.username for friend in profile_of_user.friend.all()]
        }
        return JsonResponse(info_of_friends, status=204)
    return HttpResponseNotAllowed(['GET', 'POST'])

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
                'profile_pic': friend_info.profile_pic.path,
                'number_of_reviews': friend_info.count_write,
                'number_of_friends': friend_info.count_friend,
            }
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
