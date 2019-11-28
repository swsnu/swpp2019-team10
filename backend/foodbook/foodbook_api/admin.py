from django.contrib import admin
from .models import Profile, Restaurant, Review, Tag, Menu
# Register your models here.

admin.site.register(Profile)
admin.site.register(Restaurant)
admin.site.register(Review)
admin.site.register(Tag)
admin.site.register(Menu)