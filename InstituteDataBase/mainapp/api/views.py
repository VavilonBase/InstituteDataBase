from rest_framework import viewsets, generics
from rest_framework.response import Response

from .serializers import *
from ..services.common_services import CommonServices
from ..services.disciplines_group_mark_services import DisciplinesGroupMarkServices
from ..services.disciplines_group_services import DisciplinesGroupServices
from ..services.group_services import GroupsServices
from ..services.students_services import StudentsServices


class DocumentsViewSet(viewsets.ModelViewSet):
    queryset = Documents.objects.all()
    serializer_class = DocumentSerializer


class CountriesViewSet(viewsets.ModelViewSet):
    queryset = Countries.objects.all()
    serializer_class = CountrySerializer


class MarksViewSet(viewsets.ModelViewSet):
    queryset = Marks.objects.all()
    serializer_class = MarkSerializer


class DisciplinesViewSet(viewsets.ModelViewSet):
    queryset = Disciplines.objects.all()
    serializer_class = DisciplineSerializer


class DirectionsViewSet(viewsets.ModelViewSet):
    queryset = Directions.objects.all()
    serializer_class = DirectionSerializer

# GROUPS
class GroupsListView(generics.ListAPIView):
    queryset = GroupsServices.get_queryset()
    serializer_class = GroupsServices.get_list_serializer_class()


class GroupsCreateView(generics.CreateAPIView):
    """
        return: send
        {
            "title": "ПП",
            "direction": 1,
            "disciplines_group": [{
                "credit_units": 123,
                "hours": 232,
                "discipline": 4
            }, {
                "credit_units": 123,
                "hours": 2323,
                "discipline": 2
            }, {
                "credit_units": 12312,
                "hours": 12312,
                "discipline": 1
            }]
        }
        """
    queryset = GroupsServices.get_queryset()
    serializer_class = GroupsServices.get_retrieve_serializer_class()

    def create(self, request, *args, **kwargs):
        group = super().create(request, args, kwargs).data

        if 'disciplines_group' in request.data:
            group['disciplines_group'] = DisciplinesGroupServices.create_disciplines_group(group['id'], request.data[
                'disciplines_group'])
        return Response(CommonServices.get_retrieve_group_by_group_id(group['id']))


class GroupsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GroupsServices.get_queryset()
    serializer_class = GroupsServices.get_retrieve_serializer_class()

    def get(self, request, *args, **kwargs):
        return Response(CommonServices.get_retrieve_group_by_group_id(kwargs['pk']))

    def update(self, request, *args, **kwargs):
        """
            :return: get
            {
              "id": 1,
              "title": "Группа 4",
              "direction": 1,
              "disciplines_group": [
                {
                  "id": 1,
                  "discipline": 1,
                  "credit_units": "120",
                  "hours": "221",
                  "group": 1
                },
                {
                  "discipline": 1,
                  "credit_units": "120",
                  "hours": "221",
                  "group": 1
                },
                {
                  "id": 1
                  "delete": True,
                  "discipline": 1,
                  "credit_units": "120",
                  "hours": "221",
                  "group": 1
                },
              ]
            }
        """
        group = super().update(request, args, kwargs).data
        if 'disciplines_group' in request.data:
            group['disciplines_group'] = CommonServices.update_disciplines_group(
                kwargs['pk'],
                request.data['disciplines_group'])
        return Response(CommonServices.get_retrieve_group_by_group_id(kwargs['pk']))


# STUDENTS
class StudentsListView(generics.ListAPIView):
    queryset = StudentsServices.get_queryset()
    serializer_class = StudentsServices.get_list_serializer_class()


class StudentsCreateView(generics.CreateAPIView):
    queryset = StudentsServices.get_queryset()
    serializer_class = StudentsServices.get_retrieve_serializer_class()

    def create(self, request, *args, **kwargs):
        serializer = StudentsRetrieveSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = super().create(request, args, kwargs).data
        return Response(CommonServices.get_retrieve_student_by_student_id(student['id']))

class StudentsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentsServices.get_queryset()
    serializer_class = StudentsServices.get_retrieve_serializer_class()

    def get(self, request, *args, **kwargs):
        return Response(CommonServices.get_retrieve_student_by_student_id(kwargs['pk']))

    def update(self, request, *args, **kwargs):
        """
        {
            "id": 15,
            "last_name": "Ельденев",
            "first_name": "Артем",
            "middle_name": null,
            "last_name_dp": null,
            "first_name_dp": null,
            "middle_name_dp": null,
            "birth_date": null,
            "sex": null,
            "snils": null,
            "form_of_education": null,
            "qualification": null,
            "seria_and_numder": null,
            "year_education": null,
            "education_document": null,
            "city": null,
            "group": null,
            "disciplines_group_marks": [
                {
                    "id": 12,
                    "student": 15,
                    "discipline": 22,
                    "mark": 1
                }
            ]
        }
        """
        # CHECK CHANGED GROUP
        # if group not change
        print(131231231)
        if not StudentsServices.is_group_change(kwargs['pk'], request.data['group']):
            print(112313)
            super().update(request, args, kwargs)
            if 'disciplines_group_marks' in request.data:
                DisciplinesGroupMarkServices.update_marks_service(request.data['disciplines_group_marks'])
        else:
            print(23123112313)
            super().update(request, args, kwargs)
            DisciplinesGroupMarkServices.delete_all_student_marks(kwargs['pk'])
            if (not (request.data['group'] is None)) and (request.data['group'] != ''):
                CommonServices.create_null_student_marks(student_id=kwargs['pk'], group_id=request.data['group'])
        return Response(CommonServices.get_retrieve_student_by_student_id(kwargs['pk']))
