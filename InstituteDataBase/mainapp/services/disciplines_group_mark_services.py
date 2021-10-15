from typing import List, Any

from django.shortcuts import get_object_or_404

from ..api.serializers import DisciplinesGroupMarkRetrieveSerializer, DisciplinesGroupMarkListSerializer
from ..models import DisciplinesGroupMark, DisciplinesGroup, Students


class DisciplinesGroupMarkServices:
    @staticmethod
    def get_queryset():
        return DisciplinesGroupMark.objects.all()

    @staticmethod
    def get_mark_by_mark_id(mark_id: int):
        get_object_or_404(DisciplinesGroupMark, id=mark_id)

    @staticmethod
    def get_list_serializer_class():
        return DisciplinesGroupMarkListSerializer

    @staticmethod
    def get_retrieve_serializer_class():
        return DisciplinesGroupMarkRetrieveSerializer

    @staticmethod
    def create_null_students_marks(disciplines_group: List[DisciplinesGroup], students: List[Students]):
        for student in students:
            DisciplinesGroupMarkServices.create_null_student_marks(student, disciplines_group)
        return

    @staticmethod
    def create_null_student_marks(student: Students, disciplines_group: List[DisciplinesGroup]):
        for discipline_group in disciplines_group:
            DisciplinesGroupMark.objects.create(
                discipline=discipline_group,
                student=student
            )
        return

    @staticmethod
    def get_student_marks_by_student_id(student_id: int, is_serialized=True):
        """
        return List[DisciplinesGroupMarks]
        if is_serialized = True return List with Dict with student marks data
        """
        marks = DisciplinesGroupMark.objects.filter(student=student_id)
        print(marks)

        if not is_serialized:
            return marks
        else:
            return DisciplinesGroupMarkRetrieveSerializer(marks, many=True).data

    @staticmethod
    def update_marks_service(disciplines_group_marks: List[Any]):
        """
        Example
        disciplines_group_marks = [
                {
                    "id": 12,
                    "student": 15,
                    "discipline": 22,
                    "mark": 1
                }
            ]
        """
        for discipline_group_mark in disciplines_group_marks:
            DisciplinesGroupMark.objects.filter(id=discipline_group_mark['id']).update(**discipline_group_mark)
        return

    @staticmethod
    def delete_all_student_marks(student_id: int):
        DisciplinesGroupMark.objects.filter(student=student_id).delete()
        return
