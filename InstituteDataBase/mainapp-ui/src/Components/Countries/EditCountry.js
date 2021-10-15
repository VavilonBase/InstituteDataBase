import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Button, Form } from "react-bootstrap";

function EditCountry({ match }) {
    const id = match.params.id;
    const [country, setCountry] = useState({});
    const [redirect, setRedirect] = useState(false);

    const handleChangeName = (e) => setCountry({...country, name: e.target.value});

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/countries/${id}`)
            .then((response) => {
                setCountry(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    function editCountry(e) {
        e.preventDefault();
        axios
            .put(`http://127.0.0.1:8000/api/countries/${id}/`, country)
            .then((response) => {
                setRedirect(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            {redirect && <Redirect to={"/countries/"} />}
            <Form className="mb-3 w-25 mx-auto" onSubmit={editCountry}>
                <Form.Group className="mb-3" controlId="formNameCountry">
                    <Form.Label>Наименование страны</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Наименование страны"
                        defaultValue={country.name}
                        onChange={handleChangeName}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Изменить
                </Button>
            </Form>
        </div>
    );
}

export default EditCountry;
