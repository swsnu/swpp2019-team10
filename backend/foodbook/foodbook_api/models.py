from django.db import models
#from django_mysql.models import JSONField
from django.contrib.auth.models import User
from location_field.models.plain import PlainLocationField
#from django.core.validators import RegexValidator
# Create your models here.


class Profile(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)

    #or...
    #__phone_regex=RegexValidator(regex=r'^\d{3}-\d{4}-\d{4}$', message="")
    #phone_number=models.CharField(validators=[phone_regex], max_length=17)
    age = models.IntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    #taste = JSONField()
    profile_pic=models.ImageField(upload_to="user/profile_pic/")
    count_write = models.IntegerField(default=0)
    count_friend = models.IntegerField(default=0)
    friend = models.ManyToManyField(
        'self',
        symmetrical=False
    )

class Restaurant(models.Model):
    name=models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    location=PlainLocationField
class Review(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='review_list'
    )
    date = models.DateTimeField()
    comment = models.CharField(max_length=120)

