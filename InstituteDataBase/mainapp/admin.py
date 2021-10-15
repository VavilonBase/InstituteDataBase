from django.contrib import admin

# Register your models here.
from .models import Documents, Countries, Disciplines, Directions, Marks

admin.site.register(Documents)
admin.site.register(Countries)
admin.site.register(Disciplines)
admin.site.register(Directions)
admin.site.register(Marks)