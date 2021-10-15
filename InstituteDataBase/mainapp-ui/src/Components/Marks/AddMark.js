import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Button, Form } from "react-bootstrap";

function AddMark() {
    const [mark, setMark] = useState({
        mark: null,
        view: ''
    })
    const [redirect, setRedirect] = useState(false);

    const handleChangeMark = (e) => setMark({...mark, mark: e.target.value});

    const handleChangeView = (e) => setMark({...mark, view: e.target.value});

    function addMark(e) {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/marks/", mark)
            .then((response) => {
                setRedirect(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            {redirect && <Redirect to={"/marks/"} />}
            <Form className="mb-3 w-25 mx-auto" onSubmit={addMark}>
                <Form.Group className="mb-3" controlId="formMark">
                    <Form.Label>Оценка</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Оценка"
                        onChange={handleChangeMark}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formView">
                    <Form.Label>Представление</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Представление"
                        onChange={handleChangeView}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Добавить
                </Button>
            </Form>
        </div>
    );
}

export default AddMark;
