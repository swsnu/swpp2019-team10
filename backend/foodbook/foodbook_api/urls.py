from django.urls import path

from . import views

urlpatterns = [
    path('', views.user, name='user'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('review/', views.review_list, name='review_list')
]
