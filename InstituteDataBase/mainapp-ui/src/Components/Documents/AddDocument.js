import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Form, Button } from "react-bootstrap";

function AddDocument() {
    const [title, setTitle] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleChangeTitle = (e) => setTitle(e.target.value);

    function addDocument(e) {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/documents/", {
                title: title,
            })
            .then(() => {
                setRedirect(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            {redirect && <Redirect to={"/documents/"} />}
            <Form className="mb-3 w-25 mx-auto" onSubmit={addDocument}>
                <Form.Group className="mb-3" controlId="formTitleDocument">
                    <Form.Label>Наименование документа</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Наименование документа"
                        onChange={handleChangeTitle}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Добавить
                </Button>
            </Form>
        </div>
    );
}

export default AddDocument;
