import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Button, Form } from "react-bootstrap";

function EditDirection({ match }) {
    // MATCH
    const id = match.params.id;

    // STATE
    const [direction, setDirection] = useState({});
    const [redirect, setRedirect] = useState(false);

    // HANDLERS
    const handlerChangeTitle = (e) => setDirection({...direction, title: e.target.value})
    const handlerChangeCode = (e) => setDirection({...direction, code: e.target.value})
    const handlerChangeDirector = (e) => setDirection({...direction, director: e.target.value})

    // GET DATA
    function getDirection(id) {
        axios.get(`http://127.0.0.1:8000/api/directions/${id}`)
            .then((response) => {
                setDirection(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //USE EFFECTS
    useEffect(() => {
        getDirection(id)
    }, [id]);

    // EDIT FUNCTION
    function editDirection(e) {
        e.preventDefault();
        axios
            .put(`http://127.0.0.1:8000/api/directions/${id}/`, direction)
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
            <Form className="mb-3 w-25 mx-auto" onSubmit={editDirection}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Наименование направления</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Наименование"
                        name="title"
                        defaultValue={direction.title}
                        onChange={handlerChangeTitle}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCode">
                    <Form.Label>Код направления</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Код направления"
                        name="code"
                        defaultValue={direction.code}
                        onChange={handlerChangeCode}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDirector">
                    <Form.Label>Директор</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Директор"
                        name="director"
                        defaultValue={direction.director}
                        onChange={handlerChangeDirector}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Изменить
                </Button>
            </Form>
        </div>
    );
}

export default EditDirection;
