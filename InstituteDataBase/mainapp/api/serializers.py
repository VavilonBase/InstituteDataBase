from rest_framework import serializers
from ..models import *


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documents
        fields = '__all__'


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Countries
        fields = '__all__'


class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marks
        fields = '__all__'


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplines
        fields = '__all__'


# --------------------DIRECTIONS--------------------
class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Directions
        fields = '__all__'


class DirectionGroupsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Directions
        fields = ('title', 'code')


# --------------------DISCIPLINES GROUP--------------------
class DisciplinesGroupRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisciplinesGroup
        fields = '__all__'


class DetailDisciplinesGroupSerializer(serializers.ModelSerializer):
    discipline = DisciplineSerializer()

    class Meta:
        model = DisciplinesGroup
        fields = '__all__'


# --------------------GROUPS--------------------
class GroupsListSerializer(serializers.ModelSerializer):
    direction = DirectionGroupsListSerializer()

    class Meta:
        model = Groups
        fields = '__all__'


class GroupsRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = '__all__'


# --------------------STUDENTS--------------------
class StudentsListSerializer(serializers.ModelSerializer):
    group = GroupsRetrieveSerializer()

    class Meta:
        model = Students
        fields = ['id', 'last_name', 'first_name', 'middle_name', 'birth_date', 'group']


class StudentsRetrieveSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(format='%m/%d/%Y', input_formats=['%m/%d/%Y', ])

    class Meta:
        model = Students
        fields = '__all__'

    def create(self, validated_data):
        student = Students.objects.create(**validated_data)
        disciplines_group = DisciplinesGroup.objects.filter(group=validated_data['group'])
        for discipline_group in disciplines_group:
            DisciplinesGroupMark.objects.create(
                discipline=discipline_group,
                student=student
            )
        return student


# --------------------DISCIPLINES GROUP MARK--------------------
class DisciplinesGroupMarkListSerializer(serializers.ModelSerializer):
    mark = MarkSerializer()

    class Meta:
        model = DisciplinesGroupMark
        fields = '__all__'


class DisciplinesGroupMarkRetrieveSerializer(serializers.ModelSerializer):
    discipline = DetailDisciplinesGroupSerializer()

    class Meta:
        model = DisciplinesGroupMark
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.mark = validated_data.get('mark', instance.mark)
        instance.save()
        return instance
