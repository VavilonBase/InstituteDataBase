from django.shortcuts import get_object_or_404

from .disciplines_group_mark_services import DisciplinesGroupMarkServices
from ..api.serializers import StudentsRetrieveSerializer, DisciplinesGroupMarkListSerializer, StudentsListSerializer
from ..models import Students


class StudentsServices:

    @staticmethod
    def get_queryset():
        return Students.objects.all()

    @staticmethod
    def get_students_by_group_id(group_id: int):
        return Students.objects.filter(group=group_id)

    @staticmethod
    def get_student_by_id(student_id: int, is_serialized):
        """
        return Students objects
               if is_serialized = True return Dict with student data
        """
        student = get_object_or_404(Students, id=student_id)
        if not is_serialized:
            return student
        else:
            return StudentsRetrieveSerializer(student).data

    @staticmethod
    def is_group_change(student_id: int, new_group_id: int):
        """
        if group change return True, else return False
        """
        if (new_group_id is None) or (new_group_id == ''):
            return True

        student = get_object_or_404(Students, id=student_id)
        if student.group is None:
            return True

        return student.group.id != new_group_id

    @staticmethod
    def get_list_serializer_class():
        return StudentsListSerializer

    @staticmethod
    def get_retrieve_serializer_class():
        return StudentsRetrieveSerializer
