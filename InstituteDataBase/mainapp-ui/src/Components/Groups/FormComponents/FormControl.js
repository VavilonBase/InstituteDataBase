import React from 'react';
import {Form} from "react-bootstrap";

function FormControl({label, name, placeholder, onChange, defaultValue=''}) {
    return (
        <div className="row mb-3">
            <div className="col-3 text-end">
                <Form.Label>{label}</Form.Label>
            </div>
            <div className="col">
                <Form.Control type="text" onChange={onChange}
                              placeholder={placeholder} name={name}
                              defaultValue={defaultValue}/>
            </div>
        </div>
    )
}

export default FormControl;