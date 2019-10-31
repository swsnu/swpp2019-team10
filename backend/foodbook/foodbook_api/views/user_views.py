'''
user views
'''
# pylint: disable=W0611
import json
from json.decoder import JSONDecodeError
from django.shortcuts import render
from django.contrib.auth.models import User
#from ..models import Profile, Review, Menu, Restaurant
# pylint: disable=line-too-long
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound, HttpResponseForbidden
# pylint: enable=line-too-long
from django.contrib.auth import logout, authenticate, login
from django.core.exceptions import ObjectDoesNotExist

# pylint: enable=W0611
