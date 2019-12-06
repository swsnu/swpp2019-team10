import pandas as pd

from surprise import NormalPredictor
from surprise import Dataset
from surprise import Reader
from surprise import KNNBasic
from surprise import SVD
from surprise.model_selection import cross_validate

from random import *

import math
import random

from ..models import Profile, Menu, Restaurant, Review

def size(x):
    res = 0
    for item in x:
        res += x[item] * x[item]
    return math.sqrt(res)

def cos_cal(x1, x2):
    res = 0
    size_x1 = 0
    size_x2 = 0
    for item in x1:
        if item in x2:
            res += x1[item] * x2[item]
            size_x1 += x1[item] * x1[item]
            size_x2 += x2[item] * x2[item]
    size_x1 = math.sqrt(size_x1)
    size_x2 = math.sqrt(size_x2)
    return (res / size_x1 / size_x2)

class Recommendation():
    def recommendation(user_id, **kwargs):
        review = []
        type = kwargs['type']
        category = kwargs['category'] if 'category' in kwargs else None
        log = kwargs['log'] if 'log' in kwargs else None
        lat = kwargs['lat'] if 'lat' in kwargs else None
        log_km = 1 / 88.74 # 1km for longitude
        lat_km = 1 / 109.958489129649955 # 1km for latitude
        if type == 'loc':
            review = Review.objects.select_related(
                'menu__restaurant', 'author__user').filter(category=category,
                                                           restaurant__longitude__gte=log-log_km,
                                                           restaurant__longitude__lte=log+log_km,
                                                           restaurant__latitude__gte=lat-lat_km,
                                                           restaurant__latitude__lte=lat+lat_km)
            review_my = review.filter(author__id=user_id)
            review_other = review.exclude(author__id=user_id)
            review_my_good = review_my.filter(rating__gte=4)
            review_my_bad = review_my.filter(rating__lte=2)
            review_my_soso = review_my.filter(rating__lte=4, rating__gte=2)
            review_soso = review_other.union(review_my_soso)

            good_list = [(item.rating, item.restaurant) for item in review_my_good]
            soso_list = [(item.rating, item.restaurant) for item in review_soso]
            bad_list = [(item.rating, item.restaurant) for item in review_my_bad]

            res_list = []
            if good_list:
                res_list += good_list
            if soso_list:
                res_list += soso_list
            if bad_list:
                res_list += bad_list
            res = []
            for item in res_list:
                if random.random() < 0.8:
                    res.append(item)

        else:
            review = Review.objects.select_related(
                'menu__restaurant', 'author__user').filter(restaurant__longitude__gte=log-10*log_km,
                                                           restaurant__longitude__lte=log+10*log_km,
                                                           restaurant__latitude__gte=lat-10*lat_km,
                                                           restaurant__latitude__lte=lat+10*lat_km)
            if type == 'tst':
                review = review.filter(category=category)
            itemID = [item.menu.id for item in review]
            userID = [item.author.id for item in review]
            rating = []
            for item in review:
                rating.append(cos_cal(item.menu.taste, item.author.taste))

            ratings_dict = {'itemID': itemID,
                            'userID': userID,
                            'rating': rating}
            df = pd.DataFrame(ratings_dict)

            # A reader is still needed but only the rating_scale param is requiered.
            reader = Reader(rating_scale=(0, 1))

            # The columns must correspond to user id, item id and ratings (in that order).
            data = Dataset.load_from_df(df[['userID', 'itemID', 'rating']], reader)

            trainset = data.build_full_trainset()

            algo = KNNBasic()
            algo.fit(trainset)

            res = []
            for item in review:
                pred = algo.predict(user_id, item.menu.id, verbose=True)
                res.append((pred.est, item.restaurant))
            res.sort(reverse=True, key=lambda x: x[0])



        ret = []
        ret_dict = []
        for item in res:
            restaurant = item[1]
            if restaurant.id not in ret:
                ret.append(restaurant.id)
                res_reviews = restaurant.review_list.select_related('author').all()
                my_rating = 0
                other_rating = 0
                my_count = 0
                other_count = 0
                for re in res_reviews:
                    if re.author.id == user_id:
                        my_rating += re.rating
                        my_count += 1
                    else:
                        other_rating += re.rating
                        other_count += 1
                if my_count > 0:
                    my_rating /= my_count
                if other_count > 0:
                    other_rating /= other_count
                ret_dict.append({'name': restaurant.name,
                                 'longitude': restaurant.longitude,
                                 'latitude': restaurant.latitude,
                                 'rating': restaurant.rating,
                                 'my_rating': my_rating,
                                 'other_rating': other_rating})
                if len(ret) == 10:
                    break
        return ret_dict
