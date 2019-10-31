'''
user views
'''
from django.shortcuts import render
from django.contrib.auth.models import User
#from ..models import Profile, Review, Menu, Restaurant
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound, HttpResponseForbidden
from django.contrib.auth import logout, authenticate, login
from django.core.exceptions import ObjectDoesNotExist
import json
from json.decoder import JSONDecodeError

