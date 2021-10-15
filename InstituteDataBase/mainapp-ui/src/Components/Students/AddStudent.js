import React, {useEffect, useState} from "react";
import axios from "axios";
import { Redirect } from "react-router";
import {Button, Container, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import FormControl from "./FormComponents/FormControl";
import FormSelectChoices from "./FormComponents/FormSelectChoices";
import FormSelect from "./FormComponents/FormSelect";

function AddStudent() {
    //STATE
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
        seria_and_number: '',
        city: null,
        education_document: null,
        year_education: '',
        group: null
    })
    const [educationDocuments, setEducationDocuments] = useState([])
    const [countries, setCountries] = useState([])
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

    //HANDLERS
    const handlerChangeLastName = (e) => setStudent({...student, last_name: e.target.value})
    const handlerChangeFirstName = (e) => setStudent({...student, first_name: e.target.value})
    const handlerChangeMiddleName = (e) => setStudent({...student, middle_name: e.target.value})
    const handlerChangeLastNameDp = (e) => setStudent({...student, last_name_dp: e.target.value})
    const handlerChangeFirstNameDp = (e) => setStudent({...student, first_name_dp: e.target.value})
    const handlerChangeMiddleNameDp = (e) => setStudent({...student, middle_name_dp: e.target.value})
    const handlerChangeSnils = (e) => setStudent({...student, snils: e.target.value})
    const handlerChangePassport = (e) => setStudent({...student, seria_and_number: e.target.value})
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

    useEffect(() => {
        getDocuments()
        getCountries()
        getGroups()
    }, [])

    // GET EDUCATION DOCUMENTS
    function getDocuments() {
        axios.get('http://127.0.0.1:8000/api/documents/')
            .then(response => {
                setEducationDocuments(response.data)
            })
    }

    // GET COUNTRIES
    function getCountries() {
        axios.get('http://127.0.0.1:8000/api/countries/')
            .then(response => {
                setCountries(response.data)
            })
    }

    // GET GROUPS
    function getGroups() {
        axios.get('http://127.0.0.1:8000/api/groups/')
            .then(response => {
                setGroups(response.data)
            })
    }

    function addStudent(e) {
        e.preventDefault()
        console.log(student)
        axios.post('http://127.0.0.1:8000/api/students/add', student)
            .then(() => {
                setRedirect(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            {redirect && <Redirect to={"/students/"} />}
            <Form className="mt-3 w-75 mx-auto" onSubmit={addStudent}>
                <Container>

                    {/*LASTNAME*/}
                    <FormControl
                        className="row mb-3"
                        onChange={handlerChangeLastName}
                        label={'Фамилия: '}
                        name={'lastName'}
                        placeholder={'Введите фамилию'}
                    />

                    {/*FIRSTNAME*/}
                    <FormControl
                        onChange={handlerChangeFirstName}
                        label={'Имя: '}
                        name={'firstName'}
                        placeholder={'Введите имя'}
                    />

                    {/*MIDDLENAME*/}
                    <FormControl
                        onChange={handlerChangeMiddleName}
                        label={'Отчество: '}
                        name={'middleName'}
                        placeholder={'Введите отчество'}
                    />

                    {/*LASTNAME DP*/}
                    <FormControl
                        onChange={handlerChangeLastNameDp}
                        label={'Фамилия(дательный падеж): '}
                        name={'lastNameDp'}
                        placeholder={'Введите фамилию'}
                    />

                    {/*FIRSTNAME DP*/}
                    <FormControl
                        onChange={handlerChangeFirstNameDp}
                        label={'Имя(дательный падеж): '}
                        name={'firstNameDp'}
                        placeholder={'Введите имя'}
                    />

                    {/*MIDDLENAME DP*/}
                    <FormControl
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
                        choices={sexChoices}
                    />

                    {/*SNILS*/}
                    <FormControl
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
                        choices={formEducationChoices}
                    />

                    {/*QUALIFICATION*/}
                    <FormSelectChoices
                        label={'Квалификация: '}
                        name={'qualification'}
                        onChange={handlerChangeQualification}
                        choices={qualificationChoices}
                    />

                    {/*PASSPORT*/}
                    <FormControl
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
                        choices={countries}
                        value={'id'}
                        title={'name'}
                    />

                    {/*EDUCATION DOCUMENT*/}
                    <FormSelect
                        label={'Документ об образовании: '}
                        name={'educationDocument'}
                        onChange={handlerChangeEducationDocument}
                        choices={educationDocuments}
                        value={'id'}
                        title={'title'}
                    />

                    {/*YEAR EDUCATION*/}
                    <FormControl
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
                        choices={groups}
                        value={'id'}
                        title={'title'}
                    />
                </Container>

                <Button type="submit" variant="primary" className="w-25">
                    Добавить
                </Button>
            </Form>
        </div>
    );
}

export default AddStudent;
