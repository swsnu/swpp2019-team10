'''
review views
'''

from django.shortcuts import render
from django.contrib.auth.models import User
#from ..models import Profile, Review, Menu, Restaurant
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound
from django.contrib.auth import logout, authenticate, login
import json
from json import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
