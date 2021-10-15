import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

function EditDocument({ match }) {
    const id = match.params.id;
    const [document, setDocument] = useState({})
    const [redirect, setRedirect] = useState(false);

    const handleChangeTitle = (e) => setDocument({...document, title: e.target.value})
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/api/documents/${id}`,
        }).then((response) => {
            if (response.data.title) {
                setDocument(response.data)
            } else {
                console.log("Нет такого документа");
            }
        });
    }, [id]);

    function editDocument(e) {
        e.preventDefault();
        axios
            .put(`http://127.0.0.1:8000/api/documents/${id}/`, document)
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
            <Form className="mb-3 w-25 mx-auto" onSubmit={editDocument}>
                <Form.Group className="mb-3" controlId="formTitleDocument">
                    <Form.Label>Наименование документа</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Наименование документа"
                        defaultValue={document.title}
                        onChange={handleChangeTitle}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Изменить
                </Button>
            </Form>
        </div>
    );
}

export default EditDocument;
