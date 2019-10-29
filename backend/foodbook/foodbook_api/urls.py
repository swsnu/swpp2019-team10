from django.urls import path

from .views import review_views, user_views

urlpatterns = [
    path('', user_views.user, name='user'),
    path('signup/', user_views.signup, name='signup'),
    path('signin/', user_views.signin, name='signin'),
    path('signout/', user_views.signout, name='signout'),
    path('friend/', user_views.friend, name='friend'),
    path('friend/<int:friend_id>/', user_views.friend_detail, name='friend_detail'),
    path('review/', review_views.review_list, name='review_list'),
    path('review/<int:review_id>/', review_views.review_detail, name='review_detail'),
]
