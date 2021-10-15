import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Button, Form } from "react-bootstrap";

function AddDirection() {
    const [direction, setDirection] = useState({
        title: '',
        code: '',
        director: ''
    })
    const [redirect, setRedirect] = useState(false);

    const handlerChangeTitle = (e) => setDirection({...direction, title: e.target.value});
    const handlerChangeCode = (e) => setDirection({...direction, code: e.target.value});
    const handlerChangeDirector = (e) => setDirection({...direction, director: e.target.value})

    function addDirection(e) {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/directions/", direction)
            .then((response) => {
                setRedirect(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            {redirect && <Redirect to={"/directions/"} />}
            <Form className="mb-3 w-25 mx-auto" onSubmit={addDirection}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Наименование направления</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Наименование"
                        onChange={handlerChangeTitle}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCode">
                    <Form.Label>Код направления</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Код направления"
                        onChange={handlerChangeCode}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDirector">
                    <Form.Label>Директор</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Директор"
                        onChange={handlerChangeDirector}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Добавить
                </Button>
            </Form>
        </div>
    );
}

export default AddDirection;
