from typing import List, Any

from .disciplines_group_mark_services import DisciplinesGroupMarkServices
from .disciplines_group_services import DisciplinesGroupServices
from .group_services import GroupsServices
from .students_services import StudentsServices


class CommonServices:

    @staticmethod
    def update_disciplines_group(group_id: int, disciplines_group: List[Any]):
        added_discipline_group_objects_list = DisciplinesGroupServices.update_disciplines_group(group_id, disciplines_group)
        student_objects_list = StudentsServices.get_students_by_group_id(group_id)
        DisciplinesGroupMarkServices.create_null_students_marks(added_discipline_group_objects_list,
                                                                student_objects_list)
        return DisciplinesGroupServices.get_disciplines_group_by_group_id(group_id, True)

    @staticmethod
    def get_retrieve_group_by_group_id(group_id: int):
        group = GroupsServices.get_group_by_id(group_id, True)
        group['disciplines_group'] = DisciplinesGroupServices.get_disciplines_group_by_group_id(group_id, True)
        return group

    @staticmethod
    def get_retrieve_student_by_student_id(student_id):
        student = StudentsServices.get_student_by_id(student_id, True)
        student['disciplines_group_marks'] = DisciplinesGroupMarkServices.get_student_marks_by_student_id(student_id, True)
        return student

    @staticmethod
    def create_null_student_marks(student_id: int, group_id: int):
        disciplines_group = DisciplinesGroupServices.get_disciplines_group_by_group_id(group_id, False)
        student = StudentsServices.get_student_by_id(student_id, False)
        DisciplinesGroupMarkServices.create_null_student_marks(student, disciplines_group)
        return