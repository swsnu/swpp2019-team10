'''
    views for user model
'''
from django.db import transaction
from django.http import HttpResponse, HttpResponseNotAllowed, \
JsonResponse
# pylint: disable=relative-beyond-top-level
from ..models import Review
from ..algorithms.recommendation import Recommendation
# Create your views here.


@transaction.atomic
def recommendation(request, review_id):
    '''
        method to recommend menus
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        review = Review.objects.get(id=review_id)
        menu = review.menu

        response_dict = {
            'restaurant_list': Recommendation.recommendation(request.user.profile.id, menu.name)
        }
        return JsonResponse(response_dict, status=200)
    return HttpResponseNotAllowed(['GET'])
