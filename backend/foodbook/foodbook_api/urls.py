from django.urls import path

from .views import review_views, user_views, token_views, recommendation_views

urlpatterns = [
    path('', user_views.user, name='user'),
    path('token/', token_views.token, name='token'),
    path('signup/', user_views.signup, name='signup'),
    path('signup_dupcheck/', user_views.signup_dupcheck, name='signup_dupcheck'),
    path('signup/<int:profile_id>/image/', user_views.profile_image, name='profile_image'),
    path('signin/', user_views.signin, name='signin'),
    path('signout/', user_views.signout, name='signout'),
    path('friend/', user_views.friend, name='friend'),
    path('friend/<int:friend_id>/', user_views.friend_detail, name='friend_detail'),
    path('review/', review_views.review_list, name='review_list'),

    path('review/<int:review_id>/',
         review_views.review_detail, name='review_detail'),
    path('review/<int:review_id>/image/',
         review_views.review_image, name='review_image'),
    path('friend/<int:friend_id>/review/',
         review_views.friend_review_list, name='friend_review_list'),
    path('friend/<int:friend_id>/review/<int:review_id>/',
         review_views.friend_review_detail, name='friend_review_detail'),

    path('review/<int:review_id>/recomloc/<str:coordinate_val>/',
         recommendation_views.recomloc, name='recomloc'),
    path('review/<int:review_id>/recomtst/',
         recommendation_views.recomtst, name='recomtst'),
]
