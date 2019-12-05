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
def recomloc(request, review_id, coordinate_val):
    '''
        method to recommend menus by location
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        review = Review.objects.select_related('menu').get(id=review_id)
        menu = review.menu

        str_tmp = coordinate_val
        str_split = str_tmp.split('=', 1)

        str_split = str_split[1].split(',', 1)
        lat = float(str_split[0])
        log = float(str_split[1])

        response_dict = Recommendation.recommendation(request.user.profile.id,
                                                      menu.name, type='loc',
                                                      log=log, lat=lat)
        return JsonResponse(response_dict, status=200, safe=False)
    return HttpResponseNotAllowed(['GET'])

@transaction.atomic
def recomtst(request, review_id):
    '''
        method to recommend menus by taste
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        review = Review.objects.select_related('menu').get(id=review_id)
        menu = review.menu

        response_dict = Recommendation.recommendation(request.user.profile.id,
                                                      menu.name, type='tst')
        return JsonResponse(response_dict, status=200, safe=False)
    return HttpResponseNotAllowed(['GET'])
