from django.shortcuts import get_object_or_404

from ..api.serializers import GroupsRetrieveSerializer, GroupsListSerializer
from ..models import Groups


class GroupsServices:

    @staticmethod
    def get_queryset():
        return Groups.objects.all()

    @staticmethod
    def get_group_by_id(group_id: int, is_serialized):
        """
        return Groups object or 404
            if is_serialized = True return Dict with group data
        """
        group = get_object_or_404(Groups, id=group_id)
        if not is_serialized:
            return group
        else:
            return GroupsRetrieveSerializer(group).data

    @staticmethod
    def get_list_serializer_class():
        return GroupsListSerializer

    @staticmethod
    def get_retrieve_serializer_class():
        return GroupsRetrieveSerializer

