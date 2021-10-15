import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import {Button, Container, Form, Table, Tabs} from "react-bootstrap";
import DatePicker from "react-datepicker";
import FormControl from "./FormComponents/FormControl";
import FormSelectChoices from "./FormComponents/FormSelectChoices";
import FormSelect from "./FormComponents/FormSelect";
import {Tab} from "bootstrap";
import TableFormSelect from "./FormComponents/TableFormSelect";

function EditStudent({ match }) {
    // MATCH
    const id = match.params.id;

    // STATE
    const [student, setStudent] = useState({
        last_name: '',
        first_name: '',
        middle_name: '',
        last_name_dp: '',
        first_name_dp: '',
        middle_name_dp: '',
        birth_date: null,
        sex: null,
        snils: '',
        form_of_education: null,
        qualification: '',
        seria_and_numder: '',
        city: null,
        education_document: null,
        year_education: '',
        group: null,
        disciplines_group_marks: []
    })
    const [educationDocuments, setEducationDocuments] = useState([])
    const [countries, setCountries] = useState([])
    const [marks, setMarks] = useState([])
    const [groups, setGroups] = useState([])
    const [redirect, setRedirect] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    //CHOICES
    const sexChoices = ['мужской', 'женский']
    const formEducationChoices = [
        'Очная',
        'Заочная',
        'Очно-заочная'
    ]
    const qualificationChoices = [
        'бакаливриат',
        'специалитет',
        'магистратура',
        'аспирантура'
    ]

    // HANDLERS
    const handlerChangeLastName = (e) => setStudent({...student, last_name: e.target.value})
    const handlerChangeFirstName = (e) => setStudent({...student, first_name: e.target.value})
    const handlerChangeMiddleName = (e) => setStudent({...student, middle_name: e.target.value})
    const handlerChangeLastNameDp = (e) => setStudent({...student, last_name_dp: e.target.value})
    const handlerChangeFirstNameDp = (e) => setStudent({...student, first_name_dp: e.target.value})
    const handlerChangeMiddleNameDp = (e) => setStudent({...student, middle_name_dp: e.target.value})
    const handlerChangeSnils = (e) => setStudent({...student, snils: e.target.value})
    const handlerChangePassport = (e) => setStudent({...student, seria_and_numder: e.target.value})
    const handlerChangeYearEducation = (e) => setStudent({...student, year_education: e.target.value})
    const handlerChangeSex = (e) => setStudent({...student, sex: e.target.value})
    const handlerChangeFormEducation = (e) => setStudent({...student, form_of_education: e.target.value})
    const handlerChangeQualification = (e) => setStudent({...student, qualification: e.target.value})
    const handlerChangeCountry = (e) => setStudent({...student, city: e.target.value})
    const handlerChangeEducationDocument = (e) => setStudent({...student, education_document: e.target.value})
    const handlerChangeGroup = (e) => setStudent({...student, group: e.target.value})
    const handlerChangeDate = (date) => {
        setStudent({...student, birth_date: date.toLocaleDateString()})
        setStartDate(date)
    }

    //FUNCTION FOR RETURN FUNCTION CHANGE MARK
    function createFunctionChangeMark(id) {
        return (e, student) => {
            setStudent({...student, disciplines_group_marks: student.disciplines_group_marks.map(disciplineGroupMark => {
                    if (disciplineGroupMark.id === id) {
                        disciplineGroupMark.mark = parseInt(e.target.value)
                    }
                    return disciplineGroupMark
                })})
            console.log(student)
        }
    }

    // GET EDUCATION DOCUMENT
    function getEducationDocuments() {
        axios.get('http://127.0.0.1:8000/api/documents/')
            .then((response) => {
                setEducationDocuments(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // GET COUNTRIES
    function getCountries() {
        axios.get('http://127.0.0.1:8000/api/countries/')
            .then((response) => {
                setCountries(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // GET DISCIPLINES
    function getMarks() {
        axios.get('http://127.0.0.1:8000/api/marks/')
            .then((response) => {
                setMarks(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // GET GROUPS
    function getGroups() {
        axios.get('http://127.0.0.1:8000/api/groups/')
            .then((response) => {
                setGroups(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // GET STUDENT
    function getStudent(id) {
        axios.get(`http://127.0.0.1:8000/api/students/${id}`)
            .then((response) => {
                response.data['disciplines_group_marks'] = response.data['disciplines_group_marks'].map(disciplineGroupMark => {
                    disciplineGroupMark['edit'] = createFunctionChangeMark(disciplineGroupMark.id)
                    return disciplineGroupMark
                })
                setStudent(response.data)
                setStartDate(Date.parse(response.data['birth_date']))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //USE EFFECTS
    useEffect(() => {
        getEducationDocuments()
        getCountries()
        getMarks()
        getGroups()
    }, []);

    useEffect(() => {
        getStudent(id)
    }, [id])

    // EDIT FUNCTION
    function editStudent(e) {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/students/${id}`,
            {...student, disciplines_group_marks: student.disciplines_group_marks.map(disciplineGroupMark => {return {
                    ...disciplineGroupMark,
                    discipline: disciplineGroupMark.discipline.id}}
                )})
            .then(() => {
                setRedirect(true)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            {redirect && <Redirect to={"/students/"} />}
            <Form className="mt-3 w-75 mx-auto" onSubmit={editStudent}>
                <Button type="submit" variant="primary" className="w-25">
                    Изменить
                </Button>
                <Tabs defaultActiveKey="Groups" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Groups" title="Группы" style={{'height': '500px'}}>
                        <Container>

                            {/*LASTNAME*/}
                            <FormControl
                                className="row mb-3"
                                defaultValue={student.last_name}
                                onChange={handlerChangeLastName}
                                label={'Фамилия: '}
                                name={'lastName'}
                                placeholder={'Введите фамилию'}
                            />

                            {/*FIRSTNAME*/}
                            <FormControl
                                defaultValue={student.first_name}
                                onChange={handlerChangeFirstName}
                                label={'Имя: '}
                                name={'firstName'}
                                placeholder={'Введите имя'}
                            />

                            {/*MIDDLENAME*/}
                            <FormControl
                                defaultValue={student.middle_name}
                                onChange={handlerChangeMiddleName}
                                label={'Отчество: '}
                                name={'middleName'}
                                placeholder={'Введите отчество'}
                            />

                            {/*LASTNAME DP*/}
                            <FormControl
                                defaultValue={student.last_name_dp}
                                onChange={handlerChangeLastNameDp}
                                label={'Фамилия(дательный падеж): '}
                                name={'lastNameDp'}
                                placeholder={'Введите фамилию'}
                            />

                            {/*FIRSTNAME DP*/}
                            <FormControl
                                defaultValue={student.first_name_dp}
                                onChange={handlerChangeFirstNameDp}
                                label={'Имя(дательный падеж): '}
                                name={'firstNameDp'}
                                placeholder={'Введите имя'}
                            />

                            {/*MIDDLENAME DP*/}
                            <FormControl
                                defaultValue={student.middle_name_dp}
                                onChange={handlerChangeMiddleNameDp}
                                label={'Отчество(дательный падеж): '}
                                name={'middleNameDp'}
                                placeholder={'Введите отчество'}
                            />

                            {/*BIRTH DATE*/}
                            <div className="row mb-3">
                                <div className="col-3 text-end">
                                    <Form.Label>Дата рождения(д.м.г):</Form.Label>
                                </div>
                                <div className="col">
                                    <DatePicker name="birthDate" className="w-100"
                                                selected={startDate} onChange={handlerChangeDate}
                                                dateFormat="dd.MM.yyyy"
                                    />
                                </div>
                            </div>

                            {/*SEX*/}
                            <FormSelectChoices
                                label={'Выберите пол: '}
                                name={'sex'}
                                onChange={handlerChangeSex}
                                defaultValue={student.sex}
                                choices={sexChoices}
                                edit={true}
                            />

                            {/*SNILS*/}
                            <FormControl
                                defaultValue={student.snils}
                                onChange={handlerChangeSnils}
                                label={'СНИЛС: '}
                                name={'snils'}
                                placeholder={'Введите СНИЛС'}
                            />

                            {/*FORM EDUCATION*/}
                            <FormSelectChoices
                                label={'Форма обучения: '}
                                name={'formEducation'}
                                onChange={handlerChangeFormEducation}
                                defaultValue={student.form_of_education}
                                choices={formEducationChoices}
                                edit={true}
                            />

                            {/*QUALIFICATION*/}
                            <FormSelectChoices
                                label={'Квалификация: '}
                                name={'qualification'}
                                onChange={handlerChangeQualification}
                                defaultValue={student.qualification}
                                choices={qualificationChoices}
                                edit={true}
                            />

                            {/*PASSPORT*/}
                            <FormControl
                                defaultValue={student.seria_and_numder}
                                onChange={handlerChangePassport}
                                label={'Паспорт: '}
                                name={'passport'}
                                placeholder={'Введите серию и номер паспорта'}
                            />

                            {/*COUNTRY*/}
                            <FormSelect
                                label={'Страна: '}
                                name={'country'}
                                onChange={handlerChangeCountry}
                                defaultValue={student.city}
                                choices={countries}
                                value={'id'}
                                title={'name'}
                                edit={true}
                            />

                            {/*EDUCATION DOCUMENT*/}
                            <FormSelect
                                label={'Документ об образовании: '}
                                name={'educationDocument'}
                                onChange={handlerChangeEducationDocument}
                                defaultValue={student.education_document}
                                choices={educationDocuments}
                                value={'id'}
                                title={'title'}
                                edit={true}
                            />

                            {/*YEAR EDUCATION*/}
                            <FormControl
                                defaultValue={student.year_education}
                                onChange={handlerChangeYearEducation}
                                label={'Год обучения: '}
                                name={'yearEducation'}
                                placeholder={'Введите год обучения'}
                            />

                            {/*GROUP*/}
                            <FormSelect
                                label={'Группа: '}
                                name={'group'}
                                onChange={handlerChangeGroup}
                                defaultValue={student.group}
                                choices={groups}
                                value={'id'}
                                title={'title'}
                                edit={true}
                            />
                        </Container>
                    </Tab>
                    <Tab eventKey="Disciplines" title="Оценки" className="p-3 overflow-auto" style={{'height': '500px'}}>
                        <Table striped bordered className="mt-2">
                            <thead>
                            <tr>
                                <th>Дисциплина</th>
                                <th>Зачетные единицы</th>
                                <th>Часы</th>
                                <th>Оценки</th>
                            </tr>
                            </thead>
                            <tbody>
                            {student.disciplines_group_marks.map(disciplineGroupMark => (
                                    <tr key={disciplineGroupMark.id}>
                                        <td>{disciplineGroupMark.discipline.discipline.title}</td>
                                        <td>{disciplineGroupMark.discipline.credit_units}</td>
                                        <td>{disciplineGroupMark.discipline.hours}</td>
                                        <td>
                                            <TableFormSelect
                                                name={`mark${disciplineGroupMark.id}`}
                                                onChange={e => disciplineGroupMark.edit(e, student)}
                                                choices={marks}
                                                defaultValue={disciplineGroupMark.mark}
                                                value={'id'}
                                                title={'mark'}
                                                edit={true}
                                            />
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </Form>
        </div>
    );
}

export default EditStudent;
