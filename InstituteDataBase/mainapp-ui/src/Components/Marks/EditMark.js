import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

function EditMark({ match }) {
    const id = match.params.id;
    const [mark, setMark] = useState({})
    const [redirect, setRedirect] = useState(false);

    const handleChangeMark = (e) => setMark({...mark, mark: e.target.value});
    const handleChangeView = (e) => setMark({...mark, view: e.target.value});

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/api/marks/${id}`,
        }).then((response) => {
            if (response.data.view && response.data.mark) {
                setMark(response.data)
            } else {
                console.log("Нет такой оценки");
            }
        });
    }, [id]);

    function editMark(e) {
        e.preventDefault();
        axios
            .put(`http://127.0.0.1:8000/api/marks/${id}/`, mark)
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
            <Form className="mb-3 w-25 mx-auto" onSubmit={editMark}>
                <Form.Group className="mb-3" controlId="formMark">
                    <Form.Label>Оценка</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Оценка"
                        defaultValue={mark.mark}
                        onChange={handleChangeMark}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formView">
                    <Form.Label>Представление</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Представление"
                        defaultValue={mark.view}
                        onChange={handleChangeView}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Изменить
                </Button>
            </Form>
        </div>
    );
}

export default EditMark;
