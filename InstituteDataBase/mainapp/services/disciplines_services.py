from ..models import Disciplines


def get_discipline_title(discipline_id):
    discipline = Disciplines.objects.filter(id=discipline_id).first()
    if discipline is None:
        return f"Не удалось получить дисциплину с id: {discipline_id}"

    return discipline.title


def get_discipline(discipline_id):
    discipline = Disciplines.objects.filter(id=discipline_id).first()
    if discipline is None:
        return f"Не удалось получить дисциплину с id: {discipline_id}"

    return discipline.title
