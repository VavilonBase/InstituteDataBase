from django.urls import path
from rest_framework import routers

from .views import *

router = routers.SimpleRouter()
router.register('documents', DocumentsViewSet, basename='documents')
router.register('countries', CountriesViewSet, basename='countries')
router.register('marks', MarksViewSet, basename='marks')
router.register('disciplines', DisciplinesViewSet, basename='disciplines')
router.register('directions', DirectionsViewSet, basename='directions')

urlpatterns = [
    path('groups/', GroupsListView.as_view(), name='groups'),
    path('groups/add', GroupsCreateView.as_view(), name='group_create'),
    path('groups/<int:pk>', GroupsRetrieveUpdateDestroyView.as_view(), name='group'),
    path('students/', StudentsListView.as_view(), name='students'),
    path('students/add', StudentsCreateView.as_view(), name='student_create'),
    path('students/<int:pk>', StudentsRetrieveUpdateDestroyView.as_view(), name='student'),

]
urlpatterns += router.urls
