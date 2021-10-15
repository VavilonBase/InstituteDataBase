import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Button, Form } from "react-bootstrap";

function AddCountry() {
    const [name, setName] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleChangeName = (e) => setName(e.target.value);

    function addCountry(e) {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/countries/", {
                name: name,
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
            {redirect && <Redirect to={"/countries/"} />}
            <Form className="mb-3 w-25 mx-auto" onSubmit={addCountry}>
                <Form.Group className="mb-3" controlId="formNameCountry">
                    <Form.Label>Наименование страны</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Наименование страны"
                        onChange={handleChangeName}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Добавить
                </Button>
            </Form>
        </div>
    );
}

export default AddCountry;
