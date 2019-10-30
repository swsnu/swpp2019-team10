from django.shortcuts import render
from django.contrib.auth.models import User
from ..models import Profile, Review, Menu, Restaurant
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound
from django.contrib.auth import logout, authenticate, login
import json
from json import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
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
            restaurant_name = req_data['restaurant_name']
            menu_name = req_data['menu']
            content = req_data['comment']
            img=req_data['']
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
            'content': review.comment,
            'image_url': review.review_img.url
        }
        return JsonResponse(review_dict)
    elif request.method == 'PUT':
        try:
            review = Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    
