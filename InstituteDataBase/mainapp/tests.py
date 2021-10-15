from django.test import TestCase

# Create your tests here.
data = {
    "id": 50,
    "title": "Тестовая группа 4",
    "direction": 1,
    "disciplines_group": [
        {
            "id": 44,
            "credit_units": 2,
            "hours": 232,
            "group": 50,
            "discipline": 1
        },
        {
            "id": 46,
            "credit_units": 5,
            "hours": 2,
            "discipline": 3,
            "group": 50,
            "delete": True
        },
        {
            "credit_units": 2,
            "hours": 1,
            "discipline": 2,
            "group": 50
        }
    ]
}

student = {
    "id": 22,
    "last_name": "Ельденев3",
    "first_name": "Артем",
    "group": 50,
    "disciplines_group_marks": [
        {
            "id": 27,
            "student": 27,
            "discipline": 44,
            "mark": 1
        }
    ]
}

s = {
    "id": 31,
    "last_name": "Ельденев",
    "first_name": "Артем",
    "group": 49,
    "disciplines_group_marks": [
        {
            "id": 35,
            "discipline": 48,
            "student": 31,
            "mark": 1
        }
    ]
}