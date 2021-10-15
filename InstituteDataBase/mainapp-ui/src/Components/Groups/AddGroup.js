import React, {useEffect, useState} from "react";
import axios from "axios";
import { Redirect } from "react-router";
import {Button, Container, Form, Table, Tabs} from "react-bootstrap";
import {Tab} from "bootstrap";
import {AiOutlineMinusCircle, BiPlusCircle} from "react-icons/all";
import FormControl from "./FormComponents/FormControl";
import FormSelect from "../Students/FormComponents/FormSelect";
import TableFormSelect from "./FormComponents/TableFormSelect";
import TableFormControl from "./FormComponents/TableFormControl";

function AddGroup() {
    //STATE
    const [group, setGroup] = useState({
        title: '',
        direction: null,
        disciplines_group: []
    })
    const [disciplinesGroup, setDisciplinesGroup] =  useState([])
    const [directions, setDirections] = useState([])
    const [disciplines, setDisciplines] = useState([{}])
    const [redirect, setRedirect] = useState(false);
    const [disciplineGroupKey, setDisciplineGroupKey] = useState(0)

    //HANDLERS
    const handlerChangeTitle = (e) => setGroup({...group, title: e.target.value});
    const handlerChangeDirection = (e) => setGroup({...group, direction: e.target.value});
    const handlerClickAddDisciplineGroupButton = (e) => {
        let disciplineGroup = {
            key: disciplineGroupKey,
            credit_units: 0,
            hours: 0,
            discipline: null,
            delete: createFunctionDeleteDisciplineGroup(disciplineGroupKey),
            edit: createFunctionEditDisciplineGroup(disciplineGroupKey)
        }
        setDisciplineGroupKey(disciplineGroupKey + 1)
        setDisciplinesGroup([...disciplinesGroup, disciplineGroup])
    }

    // FUNCTION FOR THE CREATE FUNCTION TO THE DELETE DisciplineGroup
    function createFunctionDeleteDisciplineGroup(key) {
        return function(disciplinesGroup) {
            setDisciplinesGroup(disciplinesGroup.filter(disciplineGroup => (disciplineGroup.key !== key)))
        }
    }

    // FUNCTION FOR THE CREATE FUNCTION TO THE EDIT DisciplineGroup
    function createFunctionEditDisciplineGroup(key) {
        function disabledDiscipline(disDiscipline) {
            disDiscipline = parseInt(disDiscipline, 10)
            if (isNaN(disDiscipline)) {
                return
            }
            setDisciplines(disciplines.map(discipline => {
                if (discipline.id === disDiscipline) {
                    discipline.disabled = true
                }
                return discipline
            }))
        }
        function unDisabledDiscipline(disDiscipline) {
            disDiscipline = parseInt(disDiscipline, 10)
            if (isNaN(disDiscipline)) {
                return
            }
            setDisciplines(disciplines.map(discipline => {
                if (discipline.id === disDiscipline) {
                    discipline.disabled = false
                }
                return discipline
            }))
        }
        return function(e, disciplinesGroup) {
            setDisciplinesGroup(disciplinesGroup.map(disciplineGroup => {
                if (disciplineGroup.key === key) {
                    let name = e.target.name
                    if (name === "creditUnits") {
                        disciplineGroup.credit_units = e.target.value
                    }
                    else if (name === "hours") {
                        disciplineGroup.hours = e.target.value
                    }
                    else if (name ==='discipline') {
                        unDisabledDiscipline(disciplineGroup.discipline)
                        disabledDiscipline(e.target.value)
                        disciplineGroup.discipline = e.target.value
                    }
                }
                return disciplineGroup
            }))
        }
    }

    useEffect(() => {
        getDirections()
        getDisciplines()
    }, [])

    // GET DIRECTIONS
    function getDirections() {
        axios.get('http://127.0.0.1:8000/api/directions/')
            .then(response => {
                setDirections(response.data)
            })
    }

    // GET DISCIPLINES
    function getDisciplines() {
        axios.get('http://127.0.0.1:8000/api/disciplines/')
            .then(response => {
                setDisciplines(response.data.map(discipline => {
                    return {...discipline, disabled: false}
                }))
            })
    }

    function addGroup(e) {
        e.preventDefault();
        let newGroup = {...group, disciplines_group: disciplinesGroup}
        setGroup(newGroup)
        console.log(newGroup)
        axios
            .post("http://127.0.0.1:8000/api/groups/add", newGroup)
            .then(() => {
                setRedirect(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            {redirect && <Redirect to={"/groups/"} />}
            <Form className="mb-3 w-75 mx-auto" onSubmit={addGroup}>

                <Tabs defaultActiveKey="Groups" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Groups" title="Группы" style={{'height': '500px'}}>
                        <Container>

                            {/*GROUP NAME*/}
                            <FormControl
                                label={'Наименование группы: '}
                                name={'groupName'}
                                placeholder={'Введите наименование группы'}
                                onChange={handlerChangeTitle}
                            />

                            {/*DIRECTIONS*/}
                            <FormSelect
                                label={'Направление: '}
                                name={'direction'}
                                onChange={handlerChangeDirection}
                                choices={directions}
                                value={'id'}
                                title={'title'}
                                edit={true}
                            />
                        </Container>
                    </Tab>
                    <Tab eventKey="Disciplines" title="Дисциплины" className="p-3 overflow-auto" style={{'height': '500px'}}>
                        <Button className="w-25" onClick={handlerClickAddDisciplineGroupButton}>
                            <BiPlusCircle className="w-10 h-10"/>
                        </Button>
                        <Table striped bordered className="mt-2">
                            <thead>
                            <tr>
                                <th>Дисциплина</th>
                                <th>Зачетные единицы</th>
                                <th>Часы</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            {/*ADD DISCIPLINES*/}
                            {disciplinesGroup.map(disciplineGroup => (
                                <tr key={disciplineGroup.key}>
                                    <td>

                                        {/*DISCIPLINES*/}
                                        <TableFormSelect
                                            name={'discipline'}
                                            onChange={(e) => disciplineGroup.edit(e, disciplinesGroup)}
                                            choices={disciplines}
                                            value={'id'}
                                            title={'title'}
                                            edit={true}
                                        />
                                    </td>
                                    <td>

                                        {/*CREDIT UNITS*/}
                                        <TableFormControl
                                            name={'creditUnits'}
                                            placeholder={'Введите количество зачетных единиц'}
                                            onChange={(e) => disciplineGroup.edit(e, disciplinesGroup)}
                                        />
                                    </td>
                                    <td>

                                        {/*HOURS*/}
                                        <TableFormControl
                                            name={'hours'}
                                            placeholder={'Введите количество часов'}
                                            onChange={(e) => disciplineGroup.edit(e, disciplinesGroup)}
                                            defaultValue={disciplineGroup.hours}
                                        />
                                    </td>
                                    <td>
                                        <Button className="w-10" onClick={() => disciplineGroup.delete(disciplinesGroup)}>
                                            <AiOutlineMinusCircle className="w-10 h-10"/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>

                <Button type="submit" variant="primary" className="w-25">
                    Добавить
                </Button>
            </Form>
        </div>
    );
}

export default AddGroup;
