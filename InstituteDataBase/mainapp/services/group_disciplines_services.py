from .check_id_sevice import check_id_service
from .error_return_services import error_return_service
from ..models import DisciplinesGroup, Disciplines, Groups


def discipline_group_validation_service(disciplines_group):
    """
    return:
    if success:
    {
        "isError": False,
        "msg": ''
    }
    if error:
    {
        "isError": True,
        "msg": Не верные данные для добавления дисциплины
    }
    """
    error = error_return_service()
    for discipline_group in disciplines_group:
        if (
                not ('discipline' in discipline_group)
                or not ('credit_units' in discipline_group)
                or not ('hours' in discipline_group)):
            error = error_return_service(True,
                                         'Не верные данные для добавления дисциплины')
    return error


def discipline_group_update_validation_service(disciplines):
    """
    disciplines: list of the discipline
    """
    data_return = {
        'error': error_return_service(),
        'disciplines': disciplines
    }

    for discipline in disciplines:

        # if id exist, then check id
        if 'id' in discipline:
            data = check_id_service(discipline['id'], f'Не корректный id дисциплины: {discipline["id"]}')
            discipline['id'] = data['id']
            data_return['error'] = data['error']
            if data_return['error']['isError']:
                return data_return

        # if discipline delete, then don't need check fields
        if 'delete' in discipline:
            return data_return

        # Check fields
        if not ('discipline' in discipline):
            data_return['error'] = error_return_service(True,
                                                        f'Для дисциплины с id {discipline["id"]} '
                                                        f'не указана дисциплина')
        elif not ('credit_units' in discipline):
            data_return['error'] = error_return_service(True,
                                                        f'Для дисциплины с id {discipline["id"]} '
                                                        f'не указано количество зачетных единиц')
        elif not ('hours' in discipline):
            data_return['error'] = error_return_service(True,
                                                        f'Для дисциплины с id {discipline["id"]} '
                                                        f'не указано количество часов')
    data_return['disciplines'] = disciplines
    return data_return


def group_disciplines_update_service(group_id, data):
    """
    data:
    [
        {
          (if update)
          "id": 1,
          "discipline": 1,
          "credit_units": "120",
          "hours": "221"
        },
        {
          (if add)
          "discipline": 1,
          "credit_units": "120",
          "hours": "221"
        },
        {
          (if delete)
          "id": 1
          "delete": True,
          ["discipline": 1,
          "credit_units": "120",
          "hours": "221"](not obligator)
        },
      ]
    """
    error = error_return_service()

    # if haven't disciplines
    if len(data) == 0:
        return error

    # Validation disciplines
    validation_data = discipline_group_update_validation_service(data)
    error = validation_data['error']
    if error['isError']:
        return error
    disciplines = validation_data['disciplines']

    # Update
    for discipline in disciplines:
        # Create
        if not ('id' in discipline):
            error = discipline_group_create_service(group_id, discipline)['error']
        # Delete
        elif 'delete' in discipline:
            if discipline['delete']:
                error = discipline_group_delete_service(discipline['id'])['error']
        # Update
        else:
            error = discipline_group_update_service(discipline)['error']

    return error


def discipline_group_create_service(group_id, discipline):
    data_return = {
        'error': error_return_service()
    }
    try:
        DisciplinesGroup.objects.create(
            group=Groups.objects.get(id=group_id),
            discipline=Disciplines.objects.get(id=discipline['discipline']),
            credit_units=discipline['credit_units'],
            hours=discipline['hours'])
    except Exception as e:
        disc = Disciplines.objects.filter(id=discipline['discipline']).first()
        if not (disc is None):
            data_return['error'] = error_return_service(True, f'Не удалось '
                                                              f'добавить дисциплину {disc.title}')
        else:
            data_return['error'] = error_return_service(True, 'Не известная ошибка при добавлении дисциплины, '
                                                              'обратитесь к администратору')
    return data_return


def discipline_group_delete_service(discipline_group_id):
    data_return = {
        'error': error_return_service()
    }
    try:
        DisciplinesGroup.objects.filter(id=discipline_group_id).delete()
    except Exception as e:
        disc = Disciplines.objects.filter(id=discipline_group_id).first()
        if not (disc is None):
            data_return['error'] = error_return_service(True, f'Не удалось удалить дисциплину {disc.title}')
        else:
            data_return['error'] = error_return_service(True, f'Не известная ошибка при удалении дисциплины, '
                                                              f'обратитесь к администратору')
    return data_return


def discipline_group_update_service(discipline):
    print("update")
    data_return = {
        'error': error_return_service()
    }
    try:
        DisciplinesGroup.objects.filter(id=discipline['id']).update(
            discipline=Disciplines.objects.get(id=discipline['discipline']),
            credit_units=discipline['credit_units'],
            hours=discipline['hours'])
    except Exception as e:
        disc = Disciplines.objects.filter(id=discipline['discipline']).first()
        if not (disc is None):
            data_return['error'] = error_return_service(True, f'Не удалось обновить дисциплину {disc.title}')
        else:
            data_return['error'] = error_return_service(True, f'Не известная ошибка при обновление дисциплины, '
                                                              f'обратитесь к администратору')
    return data_return
