'''
module
'''
from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Profile(models.Model):
    '''
    save user's information
    fields:
        user
        phone_number
        age
        gender
        profile_pic
        taste
        count_write
        count_friend
        friend: ManyToMany to self
    '''
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    age = models.IntegerField()
    #taste=hasn't decide yet
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    profile_pic = models.ImageField(upload_to="user/profile_pic/", blank=True)
    count_write = models.IntegerField(default=0)
    count_friend = models.IntegerField(default=0)
    friend = models.ManyToManyField(
        'self',
        symmetrical=False
    )
class Restaurant(models.Model):
    '''
    save restaurnt information
    fields:
        name
        location: Point Field
        rating
    '''
    name = models.CharField(max_length=50)
    longitude = models.FloatField()
    latitude = models.FloatField()
    rating = models.FloatField()

class Menu(models.Model):
    '''
    save Menu information
    fields:
        name
    '''
    name = models.CharField(max_length=50)

class Review(models.Model):
    '''
    save review information
    fields:
        author: ForeignKey(User)
        restaurant: ForeignKey(Restaurant)
        menu: ForeignKey(Menu)
        review_img
        date
        comment
        tag
    '''
    comment = models.CharField(max_length=120)
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='review_list',
        #null=True
    )
    
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='review_list',
        #null=True
    )

    menu = models.ForeignKey(
        Menu,
        on_delete=models.CASCADE,
        related_name='review_list',
        #null=True
    )
    review_img = models.ImageField(upload_to='review/images/', blank=True)
    date = models.DateTimeField()
    #tag=hasn't decide yet!
