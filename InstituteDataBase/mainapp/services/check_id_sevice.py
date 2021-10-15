from .error_return_services import error_return_service


def check_id_service(id, error_msg=''):
    data = {
        'id': id,
        'error': error_return_service()
    }

    if type(id) == int:
        return data

    # if type don't equal int, try parse to int
    try:
        data['id'] = int(id)
    except Exception as e:
        error_return_service(True, error_msg)

    return data
