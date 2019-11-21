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
    def recommendation(user_id, name):
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

        menu = Menu.objects.filter(name=name)
        res = []
        for item in menu:
            pred = algo.predict(user_id, item.id, verbose=True)
            res.append((pred.est, item.id))
        res.sort(reverse=True)

        ret = []
        for item in res:
            menu = Menu.objects.get(id=item[1])
            restaurant = menu.restaurant
            if restaurant.id not in ret:
                ret.append(restaurant.id)
        return ret
