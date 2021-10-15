import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import {Button, Container, Form, Table, Tabs} from "react-bootstrap";
import {Tab} from "bootstrap";
import {AiOutlineMinusCircle, BiPlusCircle} from "react-icons/all";
import FormControl from "./FormComponents/FormControl";
import FormSelect from "../Students/FormComponents/FormSelect";
import TableFormSelect from "./FormComponents/TableFormSelect";
import TableFormControl from "./FormComponents/TableFormControl";

function EditGroup({ match }) {
    // MATCH
    const id = match.params.id;

    // STATE
    const [group, setGroup] = useState({});
    const [editDisciplinesGroup, setEditDisciplinesGroup] = useState([])
    const [addDisciplinesGroup, setAddDisciplinesGroup] = useState([])
    const [disciplinesGroupKey, setDisciplinesGroupKey] = useState(0)
    const [directions, setDirections] = useState([])
    const [disciplines, setDisciplines] = useState([])
    const [redirect, setRedirect] = useState(false)

    // HANDLERS
    const handlerChangeTitle = (e) => setGroup({...group, title: e.target.value})
    const handlerChangeDirection = (e) => setGroup({...group, direction: e.target.value})
    const handlerAddDisciplineGroup = (e) => {
        const funcs = createFunctionEditDisciplineGroup(disciplinesGroupKey, 'add', ['credit_units', 'hours', 'discipline'])
        let disciplineGroup = {
            key: disciplinesGroupKey,
            credit_units: 0,
            hours: 0,
            discipline: null,
            changeCreditUnits: funcs[0],
            changeHours: funcs[1],
            changeDiscipline: funcs[2],
            delete: function(disciplinesGroup) {
                setAddDisciplinesGroup(disciplinesGroup.filter(disciplineGroup => (disciplineGroup.key !== disciplinesGroupKey)))
            }
        }
        setDisciplinesGroupKey(disciplinesGroupKey + 1)
        setAddDisciplinesGroup([...addDisciplinesGroup, disciplineGroup])
    }

    //CREATE EDIT DISCIPLINES GROUP FUNCTION
    function createFunctionEditDisciplineGroup(key, action, changeTargets) {
        let setFunc = action === 'add' ? setAddDisciplinesGroup : setEditDisciplinesGroup
        let func = []
        changeTargets.forEach(changeTarget => {
            func.push(
                (e, disciplinesGroup) => {
                    setFunc(
                        disciplinesGroup.map(disciplineGroup => {
                            if (disciplineGroup.key === key) {
                                disciplineGroup[changeTarget] = e.target.value
                            }
                            return disciplineGroup
                        })
                    )
                }
            )
        })
        return func
    }

    //USE EFFECTS
    useEffect(() => {
        getDirections()
        getDisciplines()
    }, [])

    useEffect(() => {
        getGroup(id)
    }, [id])

    // GET GROUP
    function getGroup(id) {
        let key = disciplinesGroupKey
        axios.get(`http://127.0.0.1:8000/api/groups/${id}`)
            .then(response => {
                setGroup(response.data)
                setEditDisciplinesGroup(response.data.disciplines_group.map(disciplineGroup => {
                    const funcs = createFunctionEditDisciplineGroup(key, 'edit', ['credit_units', 'hours', 'discipline'])
                    disciplineGroup = {
                        ...disciplineGroup,
                        key: key,
                        changeCreditUnits: funcs[0],
                        changeHours: funcs[1],
                        changeDiscipline: funcs[2],
                        deleteFunc: function(disciplinesGroup) {
                            setEditDisciplinesGroup(disciplinesGroup.map(disciplineGroup => {
                                if (disciplineGroup.key !== this.key) return disciplineGroup
                                return {...disciplineGroup, delete: true}
                            }))
                        }
                    }
                    key = key + 1
                    return disciplineGroup
                }))
                setDisciplinesGroupKey(key)
            })
    }

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

    function editGroup(e) {
        e.preventDefault();
        let editGroup = {...group, disciplines_group: [...editDisciplinesGroup, ...addDisciplinesGroup]}
        setGroup(editGroup)
        axios
            .put(`http://127.0.0.1:8000/api/groups/${id}`, editGroup)
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
            <Form className="mb-3 w-75 mx-auto" onSubmit={editGroup}>

                <Tabs defaultActiveKey="Groups" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Groups" title="Группы" style={{'height': '500px'}}>
                        <Container>

                            {/*GROUP NAME*/}
                            <FormControl
                                label={'Наименование группы: '}
                                name={'groupName'}
                                placeholder={'Введите наименование группы'}
                                defaultValue={group.title}
                                onChange={handlerChangeTitle}
                            />

                            {/*DIRECTIONS*/}
                            <FormSelect
                                label={'Направление: '}
                                name={'direction'}
                                onChange={handlerChangeDirection}
                                defaultValue={group.direction}
                                choices={directions}
                                value={'id'}
                                title={'title'}
                                edit={true}
                            />
                        </Container>
                    </Tab>
                    <Tab eventKey="Disciplines" title="Дисциплины" className="p-3 overflow-auto" style={{'height': '500px'}}>
                        <Button className="w-25" onClick={handlerAddDisciplineGroup}>
                            <BiPlusCircle className="w-10 h-10"/>
                        </Button>
                        <Table striped bordered className="mt-2">
                            <thead>
                                <tr>
                                    <th>Дисциплина</th>
                                    <th>Зачетные единицы</th>
                                    <th>Часы</th>
                                </tr>
                            </thead>
                            <tbody>
                            {/*EDIT DISCIPLINES*/}
                            {editDisciplinesGroup.map((disciplineGroup) => {
                                if (!disciplineGroup.delete) return (
                                    <tr key={disciplineGroup.key}>
                                        <td>

                                            {/*DISCIPLINES*/}
                                            <TableFormSelect
                                                name={'discipline'}
                                                onChange={e => disciplineGroup.changeDiscipline(e, editDisciplinesGroup)}
                                                choices={disciplines}
                                                value={'id'}
                                                title={'title'}
                                                defaultValue={disciplineGroup.discipline}
                                                edit={true}
                                            />
                                        </td>
                                        <td>

                                            {/*CREDIT UNITS*/}
                                            <TableFormControl
                                                name={'creditUnits'}
                                                placeholder={'Введите количество зачетных единиц'}
                                                onChange={e => disciplineGroup.changeCreditUnits(e, editDisciplinesGroup)}
                                                defaultValue={disciplineGroup.credit_units}
                                            />
                                        </td>
                                        <td>

                                            {/*HOURS*/}
                                            <TableFormControl
                                                name={'hours'}
                                                placeholder={'Введите количество часов'}
                                                onChange={e => disciplineGroup.changeHours(e, editDisciplinesGroup)}
                                                defaultValue={disciplineGroup.hours}
                                            />
                                        </td>
                                        <td>
                                            <Button className="w-10" onClick={() => disciplineGroup.deleteFunc(editDisciplinesGroup)}>
                                                <AiOutlineMinusCircle className="w-10 h-10"/>
                                            </Button>
                                        </td>
                                    </tr>

                                )
                            })}

                            {/*ADD DISCIPLINES*/}
                            {addDisciplinesGroup.map((disciplineGroup) => (
                                <tr key={disciplineGroup.key}>
                                    <td>

                                        {/*DISCIPLINES*/}
                                        <TableFormSelect
                                            name={'discipline'}
                                            onChange={e => disciplineGroup.changeDiscipline(e, addDisciplinesGroup)}
                                            choices={disciplines}
                                            value={'id'}
                                            title={'title'}
                                            defaultValue={disciplineGroup.discipline}
                                            edit={true}
                                        />
                                    </td>
                                    <td>

                                        {/*CREDIT UNITS*/}
                                        <TableFormControl
                                            name={'creditUnits'}
                                            placeholder={'Введите количество зачетных единиц'}
                                            onChange={e => disciplineGroup.changeCreditUnits(e, addDisciplinesGroup)}
                                            defaultValue={disciplineGroup.credit_units}
                                        />
                                    </td>
                                    <td>

                                        {/*HOURS*/}
                                        <TableFormControl
                                            name={'hours'}
                                            placeholder={'Введите количество часов'}
                                            onChange={e => disciplineGroup.changeHours(e, addDisciplinesGroup)}
                                            defaultValue={disciplineGroup.hours}
                                        />
                                    </td>
                                    <td>
                                        <Button className="w-10" onClick={() => disciplineGroup.delete(addDisciplinesGroup)}>
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
                    Изменить
                </Button>
            </Form>
        </div>
    );
}

export default EditGroup;
