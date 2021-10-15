import React from 'react';
import {Form} from "react-bootstrap";

function TableFormControl({placeholder, onChange, name= '', defaultValue= ''}) {
    return (
        <Form.Control type="text" onChange={onChange}
                      placeholder={placeholder} name={name}
                      defaultValue={defaultValue}/>
    )
}

export default TableFormControl;