import pandas as pd

from surprise import NormalPredictor
from surprise import Dataset
from surprise import Reader
from surprise import KNNBasic
from surprise import SVD
from surprise.model_selection import cross_validate

from random import *

import math

from ..models import Profile, Menu, Restaurant, Review

def size(x):
    res = 0
    for item in x:
        res += x[item] * x[item]
    return math.sqrt(res)

class Recommendation():
    def recommendation(user_id, name, **kwargs):
        review = []
        type = kwargs['type']
        log = kwargs['log'] if 'log' in kwargs else None
        lat = kwargs['lat'] if 'lat' in kwargs else None
        if type == 'loc':
            review = Review.objects.filter(menu__name=name)
            review = review.filter(restaurant__longitude__gte=log-0.05)
            review = review.filter(restaurant__longitude__lte=log+0.05)
            review = review.filter(restaurant__latitude__gte=lat-0.05)
            review = review.filter(restaurant__latitude__lte=lat+0.05)
        else:
            review = Review.objects.filter(menu__name=name)
        itemID = [item.menu.id for item in review]
        userID = [item.author.id for item in review]
        rating = []
        for item in review:
            x1 = item.menu.taste
            x2 = item.author.taste
            res = 0
            res += x1['sweet'] * x2['sweet']
            res += x1['sour'] * x2['sour']
            res += x1['bitter'] * x2['bitter']
            res += x1['salty'] * x2['salty']
            res += x1['umami'] * x2['umami']
            rating.append(res / size(x1) / size(x2))

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
                res_reviews = restaurant.review_list.all()
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
