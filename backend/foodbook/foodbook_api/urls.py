from django.urls import path

from .views import review_views, user_views

urlpatterns = [
    path('', views.user, name='user'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('review/', views.review_list, name='review_list'),
    path('review/<int:review_id>/', views.review_detail, name='review_detail')
]
