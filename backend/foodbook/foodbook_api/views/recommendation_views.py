'''
    views for user model
'''
from django.http import HttpResponse, HttpResponseNotAllowed, \
JsonResponse
# pylint: disable=relative-beyond-top-level
from django.db import transaction
from ..models import Review
from ..algorithms.recommendation import Recommendation
# Create your views here.


@transaction.atomic
def recomloc(request, review_id):
    '''
        method to recommend menus by location
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        review = Review.objects.get(id=review_id)
        menu = review.menu

        response_dict = {
            'restaurant_list': Recommendation.recommendation(request.user.profile.id,
                                                             menu.name, type='loc')
        }
        return JsonResponse(response_dict, status=200)
    return HttpResponseNotAllowed(['GET'])

@transaction.atomic
def recomtst(request, review_id):
    '''
        method to recommend menus by taste
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        review = Review.objects.get(id=review_id)
        menu = review.menu

        response_dict = {
            'restaurant_list': Recommendation.recommendation(request.user.profile.id,
                                                             menu.name, type='tst')
        }
        return JsonResponse(response_dict, status=200)
    return HttpResponseNotAllowed(['GET'])
