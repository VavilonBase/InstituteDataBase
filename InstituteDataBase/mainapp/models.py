from django.db import models


class Documents(models.Model):
    title = models.CharField(max_length=300, verbose_name='Наименование')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Документ'
        verbose_name_plural = 'Документы'


# Countries
class Countries(models.Model):
    name = models.CharField(max_length=100, verbose_name='Наименование страны', unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Страна'
        verbose_name_plural = 'Страны'


# Marks
class Marks(models.Model):
    view = models.CharField(max_length=20, verbose_name='Представление')
    mark = models.SmallIntegerField(verbose_name='Оценка')

    def __str__(self):
        return str(self.mark)

    class Meta:
        verbose_name = 'Оценка'
        verbose_name_plural = 'Оценки'


# Disciplines
class Disciplines(models.Model):
    type_choice = [
        ('Дисциплина', 'Дисциплина'),
        ('Практика', 'Практика'),
        ('Факультатив', 'Факультатив'),
        ('Курсовая работа', 'Курсовая работа')
    ]
    title = models.CharField(max_length=100, verbose_name='Наименование')
    type = models.CharField(max_length=20, verbose_name='Типы', choices=type_choice, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Дисциплина'
        verbose_name_plural = 'Дисциплины'
        ordering = ['type', 'title']


# Directions
class Directions(models.Model):
    title = models.CharField(max_length=100, verbose_name='Наименование')
    code = models.CharField(max_length=10, verbose_name='Код направления', unique=True)
    director = models.CharField(max_length=100, verbose_name='Директор')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Направление'
        verbose_name_plural = 'Направления'


# Groups
class Groups(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название группы')
    direction = models.ForeignKey(Directions, on_delete=models.CASCADE, verbose_name='Направление', null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


# Disciplines of the Group
class DisciplinesGroup(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)
    discipline = models.ForeignKey(Disciplines, on_delete=models.CASCADE)
    credit_units = models.SmallIntegerField()
    hours = models.SmallIntegerField()

    def __str__(self):
        return self.discipline.title


# Practices of the Group
class PracticesGroup(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)
    practice = models.ForeignKey(Disciplines, on_delete=models.CASCADE)
    credit_units = models.SmallIntegerField()
    hours = models.SmallIntegerField()


# Facultatives of the Group
class FacultativesGroup(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)
    facultative = models.ForeignKey(Disciplines, on_delete=models.CASCADE)
    credit_units = models.SmallIntegerField()
    hours = models.SmallIntegerField()


# Coursework of the Group
class CourseworkGroup(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)
    coursework = models.ForeignKey(Disciplines, on_delete=models.CASCADE)
    theme = models.TextField()


# Students
class Students(models.Model):
    form_of_education_choice = [
        ('Очная', 'Очная'),
        ('Заочная', 'Заочная'),
        ('Очно-заочная', 'Очно-заочная')
    ]
    sex_choice = [
        ('мужской', 'мужской'),
        ('женский', 'женский')
    ]
    last_name = models.CharField(max_length=50, verbose_name='Фамилия')
    first_name = models.CharField(max_length=50, verbose_name='Имя', null=True, blank=True)
    middle_name = models.CharField(max_length=50, verbose_name='Отчество', null=True, blank=True)
    last_name_dp = models.CharField(max_length=51, verbose_name='Фамилия(дательный падеж)', null=True, blank=True)
    first_name_dp = models.CharField(max_length=51, verbose_name='Имя(дательный падеж)', null=True, blank=True)
    middle_name_dp = models.CharField(max_length=51, verbose_name='Отчество(дательный падеж)', null=True, blank=True)
    birth_date = models.DateField(verbose_name='Дата рождения', null=True, blank=True)
    sex = models.CharField(max_length=10, verbose_name='Пол', choices=sex_choice, null=True, blank=True)
    snils = models.CharField(max_length=14, verbose_name='СНИЛС', null=True, blank=True)
    education_document = models.ForeignKey(Documents, on_delete=models.SET_NULL, verbose_name='Документ об образовании',
                                           null=True, blank=True)
    form_of_education = models.CharField(max_length=20, verbose_name='Форма обучения', choices=form_of_education_choice,
                                         null=True, blank=True)
    qualification = models.CharField(max_length=40, verbose_name='Квалификация', null=True, blank=True)
    seria_and_numder = models.CharField(max_length=40, verbose_name='Серия и номер', null=True, blank=True)
    year_education = models.CharField(max_length=4, verbose_name='Год выдачи предыдущего документа об образовании',
                                      null=True, blank=True)
    city = models.ForeignKey(Countries, on_delete=models.SET_NULL, verbose_name='Город', null=True, blank=True)
    group = models.ForeignKey(Groups, on_delete=models.SET_NULL, verbose_name='Группа', null=True)

    def __str__(self):
        return f'{self.last_name} {self.first_name} {self.middle_name}'

    class Meta:
        verbose_name = 'Студент'
        verbose_name_plural = 'Студенты'


# Disciplines of the Group
class DisciplinesGroupMark(models.Model):
    discipline = models.ForeignKey(DisciplinesGroup, on_delete=models.CASCADE, verbose_name='Дисциплина')
    student = models.ForeignKey(Students, on_delete=models.CASCADE, verbose_name='Студент')
    mark = models.ForeignKey(Marks, verbose_name='Оценка', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return F'Оценка студента {self.student} по предмету {self.discipline}'

    class Meta:
        verbose_name = 'Оценка по дисциплине'
        verbose_name_plural = 'Оценки по дисциплинам'


# Practices of the Group
class PracticesGroupMark(models.Model):
    practice = models.ForeignKey(DisciplinesGroup, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    mark = models.ForeignKey(Marks, verbose_name='Оценка', on_delete=models.SET_NULL, null=True)


# Facultatives of the Group
class FacultativesGroupMark(models.Model):
    facultative = models.ForeignKey(DisciplinesGroup, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    mark = models.ForeignKey(Marks, verbose_name='Оценка', on_delete=models.SET_NULL, null=True)


# Coursework of the Group
class CourseworkGroupMark(models.Model):
    courseworks = models.ForeignKey(DisciplinesGroup, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    mark = models.SmallIntegerField()
