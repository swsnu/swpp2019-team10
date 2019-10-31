from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound, HttpResponseForbidden, HttpResponseBadRequest

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
