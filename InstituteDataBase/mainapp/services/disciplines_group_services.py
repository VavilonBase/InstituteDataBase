from typing import List, Any

from .check_id_sevice import check_id_service
from .error_return_services import error_return_service
from ..api.serializers import DisciplinesGroupRetrieveSerializer
from ..models import DisciplinesGroup, Disciplines, Groups


class DisciplinesGroupServices:

    @staticmethod
    def get_queryset():
        return DisciplinesGroup.objects.all()

    @staticmethod
    def get_disciplines_group_by_group_id(group_id: int, is_serialized):
        """
        return List[DisciplinesGroup] if is_serialized = False,
               Dict with disciplines group data if is_serialized = True
        """
        disciplines_group = DisciplinesGroup.objects.filter(group=group_id)
        if not is_serialized:
            return disciplines_group
        else:
            disciplines_group_serializer = DisciplinesGroupRetrieveSerializer(disciplines_group, many=True)
            return disciplines_group_serializer.data

    @staticmethod
    def get_list_serializer_class():
        return False

    @staticmethod
    def get_retrieve_serializer_class():
        return DisciplinesGroupRetrieveSerializer


    @staticmethod
    def create_discipline_group(group_id: int, discipline_group):
        """
        return DisciplineGroup object
        """
        discipline_group['group'] = group_id
        print("Data - ", discipline_group)
        discipline_group_serializer = DisciplinesGroupRetrieveSerializer(data=discipline_group)
        print("3")
        discipline_group_serializer.is_valid()
        print(discipline_group_serializer.errors)
        print("Дошло")
        return discipline_group_serializer.save()

    @staticmethod
    def create_disciplines_group(group_id: int, disciplines_group: List[Any]):
        """
        return Dict with disciplines group
        """
        disciplines_group_return = []
        for discipline_group in disciplines_group:
            disciplines_group_return.append(
                DisciplinesGroupServices.create_discipline_group(group_id, discipline_group)
            )
        disciplines_group_return = DisciplinesGroupRetrieveSerializer(disciplines_group_return, many=True)
        return disciplines_group_return.data

    @staticmethod
    def update_disciplines_group(group_id: int, disciplines_group: List[Any]):
        """
        return list with added DisciplineGroup object
        """
        added_disciplines_group = []
        for discipline_group in disciplines_group:
            if 'id' in discipline_group:
                # if delete
                if 'delete' in discipline_group:
                    DisciplinesGroup.objects.filter(id=discipline_group['id']).delete()
                else:
                    # if update
                    DisciplinesGroup.objects.filter(id=discipline_group['id']).update(
                        credit_units = discipline_group['credit_units'],
                        hours = discipline_group['hours'],
                        discipline = discipline_group['discipline']
                    )
            else:
                print("1")
                # if add
                added_disciplines_group.append(DisciplinesGroupServices.create_discipline_group(group_id, discipline_group))
        return added_disciplines_group