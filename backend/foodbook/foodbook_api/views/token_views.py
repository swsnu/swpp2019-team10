'''
    views for getting csrf token
'''
from django.http import HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def token(request):
    '''
        method to get csrf token
    '''
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])
