import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Button, Form } from "react-bootstrap";

function EditDiscipline({ match }) {
    const id = match.params.id;
    const [discipline, setDiscipline] = useState({})
    const type_of_choice = [
        "Дисциплина",
        "Практика",
        "Факультатив",
        "Курсовая работа",
    ];
    const [redirect, setRedirect] = useState(false);

    const handleChangeTitle = (e) => setDiscipline({...discipline, title: e.target.value});

    const handleChangeType = (e) => setDiscipline({...discipline, type: e.target.value});

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/disciplines/${id}`)
            .then((response) => {
                setDiscipline(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    function editDiscipline(e) {
        e.preventDefault();
        axios
            .put(`http://127.0.0.1:8000/api/disciplines/${id}/`, discipline)
            .then(() => {
                setRedirect(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            {redirect && <Redirect to={"/disciplines/"} />}
            <Form className="mb-3 w-25 mx-auto" onSubmit={editDiscipline}>
                <Form.Group className="mb-3" controlId="formTitleDiscipline">
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Наименование дисциплины"
                        onChange={handleChangeTitle}
                        defaultValue={discipline.title}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTypeDiscipline">
                    <Form.Label>Тип</Form.Label>
                    <Form.Select onChange={handleChangeType}>
                        <option key="Пустой элемент" value="">
                            Не выбрано
                        </option>
                        {type_of_choice.map((type_choice) => {
                            if (type_choice === discipline.type) {
                                return (
                                    <option
                                        key={type_choice}
                                        value={type_choice}
                                        selected
                                    >
                                        {type_choice}
                                    </option>
                                );
                            } else {
                                return (
                                    <option
                                        key={type_choice}
                                        value={type_choice}
                                    >
                                        {type_choice}
                                    </option>
                                );
                            }
                        })}
                    </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Изменить
                </Button>
            </Form>
        </div>
    );
}

export default EditDiscipline;
