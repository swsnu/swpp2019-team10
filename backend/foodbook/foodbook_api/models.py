'''
module
'''
# pylint: disable=R0903
from django.db import models
from django.contrib.auth.models import User
from django.forms import ModelForm
from django_mysql.models import JSONField
# Create your models here.

def default_tag():
    '''
    method returns default tag
    '''
    return []

def my_default():
    '''
    method returns default tag with values
    '''
    return {'sweet': 0.5, 'salty': 0.5, 'umami': 0.5, 'bitter': 0.5, 'sour': 0.5,
            'crispy': 0.5, 'moist': 0.5, 'greasy': 0.5, 'tender': 0.5, 'cooked': 0.5}
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
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, null=True)
    age = models.IntegerField(null=True)
    taste = JSONField(default=my_default)
    gender = models.CharField(max_length=1, null=True)
    nickname = models.CharField(max_length=100)
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
    rating = models.FloatField(default=0)

class Menu(models.Model):
    '''
    save Menu information
    fields:
        name
    '''
    name = models.CharField(max_length=50)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='menu_list',
        null=True
    )
    taste = JSONField(
        default=my_default)
    num_of_review = models.IntegerField(default=0)

class Review(models.Model):
    '''
    save review information
    fields:
        author: ForeignKey(Profile)
        restaurant: ForeignKey(Restaurant)
        menu: ForeignKey(Menu)
        review_img
        date
        comment
        tag
    '''
    content = models.CharField(max_length=120)
    rating = models.FloatField(default=0)
    author = models.ForeignKey(
        Profile,
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
    date = models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=20, blank=True)
    tag = models.ManyToManyField(
        'Tag',
        default=default_tag
    )
    #tag=hasn't decide yet!

class Tag(models.Model):
    '''
    save tag information
    fields:
        name
        sentimental
    '''
    name = models.CharField(max_length=30)
    sentimental = models.FloatField()

class ProfileForm(ModelForm):
    '''
    ModelForm to save image
    '''
    # pylint: disable=too-few-public-methods
    class Meta:
        '''
        Meta
        '''
        model = Profile
        fields = ['profile_pic']

class ReviewForm(ModelForm):
    '''
    ModelForm to save image
    '''
    class Meta:
        '''
        Meta
        '''
        model = Review
        fields = ['review_img']
