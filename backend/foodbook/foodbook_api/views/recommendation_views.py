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

def get_loc(str_tmp):
    '''
        method to return current location coordinate value
    '''
    str_split = str_tmp.split('=', 1)

    str_split = str_split[1].split(',', 1)
    lat = float(str_split[0])
    log = float(str_split[1])
    return (lat, log)

@transaction.atomic
def recomloc(request, review_id, coordinate_val):
    '''
        method to recommend menus by location
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        review = Review.objects.get(id=review_id)

        lat, log = get_loc(coordinate_val)

        response_dict = Recommendation.recommendation(request.user.profile.id,
                                                      category=review.category,
                                                      type='loc',
                                                      log=log, lat=lat)
        return JsonResponse(response_dict, status=200, safe=False)
    return HttpResponseNotAllowed(['GET'])

@transaction.atomic
def recomtst(request, review_id, coordinate_val):
    '''
        method to recommend menus by taste
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        review = Review.objects.get(id=review_id)

        lat, log = get_loc(coordinate_val)

        response_dict = Recommendation.recommendation(request.user.profile.id,
                                                      category=review.category,
                                                      type='tst',
                                                      log=log, lat=lat)
        return JsonResponse(response_dict, status=200, safe=False)
    return HttpResponseNotAllowed(['GET'])

@transaction.atomic
def recomifh(request, coordinate_val):
    '''
        method to recommend menus when "I feel hungry"
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        lat, log = get_loc(coordinate_val)

        response_dict = Recommendation.recommendation(request.user.profile.id,
                                                      type='ifh',
                                                      log=log, lat=lat)
        return JsonResponse(response_dict, status=200, safe=False)
    return HttpResponseNotAllowed(['GET'])
