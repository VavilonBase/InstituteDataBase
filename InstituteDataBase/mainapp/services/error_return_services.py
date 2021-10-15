def error_return_service(isError = False, msg = ''):
    """
    return:
    {
        "isError": isError,
        "msg": msg
    }
    """
    return {
        'isError': isError,
        'msg': msg
    }