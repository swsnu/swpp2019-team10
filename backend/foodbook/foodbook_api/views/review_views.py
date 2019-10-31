'''
views for reviews
'''
from django.shortcuts import render
from django.contrib.auth.models import User
# pylint: disable=line-too-long
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound
from django.contrib.auth import logout, authenticate, login
import json
from json import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from ..models import Profile, Review, Menu, Restaurant, ReviewForm
# pylint: enable=line-too-long


def review_list(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        review_all_list = [
            review for review in Review.objects.filter(author=request.user.profile).values()]
        return JsonResponse(review_all_list, safe=False)
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            restaurant_name = req_data['restaurant_name']
            menu_name = req_data['menu_name']
            content = req_data['content']
            #rating = req_data['rating']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(content=str(e))
        restaurant = Restaurant.objects.get(name=restaurant_name)
        menu = Menu.objects.get(name=menu_name)
        new_review = Review.objects.create(
            author=request.user.profile,
            restaurant=restaurant,
            menu=menu,
            content=content,
            #rating=rating,
            )
        dict_new_review = {
            'id': new_review.id,
            'author': new_review.author.id,
            'restaurant': new_review.restaurant.id,
            'menu': new_review.menu.id,
            'content': new_review.content,
            #'rating': new_review.rating,
            'date': new_review.date
            }
        return JsonResponse(dict_new_review, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def review_detail(request, review_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        try:
            review = Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        review_dict = dict_new_review = {
            'id': review.id,
            'author': review.author.id,
            'restaurant': review.restaurant.id,
            'menu': review.menu.id,
            'content': review.content,
            'rating': review.rating,
            'date': review.date,
            'image': review.review_img.path
        }
        return JsonResponse(review_dict)
    elif request.method == 'PUT':
        try:
            review = Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if request.user.id != review.author.id:
            return HttpResponse(status=403)
        try:
            req_data = json.loads(request.body.decode())
            restaurant_name = req_data['restaurant_name']
            menu_name = req_data['menu_name']
            content = req_data['content']
            rating = req_data['rating']
            img = req_data['image']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(content=str(e))
        restaurant = Restaurant.objects.get(name=restaurant_name)
        menu = Menu.objects.get(name=menu_name)
        review.restaurant = restaurant
        review.menu = menu
        review.content = content
        review.rating = rating
        review.review_img = img
        review.save()
        dict_review = {
            'id': review.id,
            'author': review.author.id,
            'restaurant': review.restaurant.id,
            'menu': review.menu.id,
            'content': review.content,
            'rating': review.rating,
            'date': review.date,
            'image': review.review_img.path
        }
        return JsonResponse(dict_review, status=201)
    elif request.method == 'DELETE':
        try:
            review = Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if request.user.id != review.author.id:
            return HttpResponse(status=403)
        review.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

def friend_review_list(request, friend_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    friend = Profile.objects.get(id=friend_id)
    if friend not in request.user.profile.friend.all():
        return HttpResponse(status=403)
    elif request.method == 'GET':
        review_all_list = [
            review for review in Review.objects.filter(user=friend).values()]
        return JsonResponse(review_all_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def friend_review_detail(request, friend_id, review_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    friend = Profile.objects.get(id=friend_id)
    if friend not in request.user.profile.friend.all():
        return HttpResponse(status=403)
    elif request.method == 'GET':
        try:
            review = Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if review.author.id != friend_id:
            return HttpResponse(status=403)
        review_dict = dict_new_review = {
            'id': review.id,
            'author': review.author.id,
            'restaurant': review.restaurant.id,
            'menu': review.menu.id,
            'content': review.content,
            'rating': review.rating,
            'date': review.date,
            'image': review.review_img.path
        }
        return JsonResponse(review_dict)
    else:
        return HttpResponseNotAllowed(['GET'])


def review_image(request, review_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        review = Review.objects.get(id=review_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()
    if request.user.id != review.author.id:
        return HttpResponse(status=403)
    if request.method == 'POST':
        form = ReviewForm(request.POST, request.FILES, instance=review)
        if form.is_valid():
            # file is saved
            form.save()
            return HttpResponse(status=201)
    else:
        form = ReviewForm()
    return render(request, 'review_image.html', {'form': form})
