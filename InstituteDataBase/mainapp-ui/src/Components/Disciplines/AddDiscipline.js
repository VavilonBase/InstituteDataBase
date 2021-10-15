import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import {Button, Form} from "react-bootstrap"

function AddDiscipline() {
    const [discipline, setDiscipline] = useState({
        title: '',
        type: null
    })
    const type_of_choice = [
        "Дисциплина",
        "Практика",
        "Факультатив",
        "Курсовая работа"
    ];
    const [redirect, setRedirect] = useState(false);

    const handleChangeTitle = (e) => setDiscipline({...discipline, title: e.target.value});

    const handleChangeType = (e) => setDiscipline({...discipline, type: e.target.value});

    function addDiscipline(e) {
        e.preventDefault();
        if (discipline.type !== "") {
            console.log(discipline)
            axios
                .post("http://127.0.0.1:8000/api/disciplines/", discipline)
                .then(() => {
                    setRedirect(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("Тип Дисциплины не выбран");
        }
    }

    return (
        <div>
            {redirect && <Redirect to={"/disciplines/"} />}
            <Form className="mb-3 w-25 mx-auto" onSubmit={addDiscipline}>
                <Form.Group className="mb-3" controlId="formTitleDiscipline">
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Наименование дисциплины"
                        onChange={handleChangeTitle}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTypeDiscipline">
                    <Form.Label>Тип</Form.Label>
                    <Form.Select onChange={handleChangeType}>
                        <option key="Пустой элемент" value="">
                            Не выбрано
                        </option>
                        {type_of_choice.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Добавить
                </Button>
            </Form>
        </div>
    )
}

export default AddDiscipline;
