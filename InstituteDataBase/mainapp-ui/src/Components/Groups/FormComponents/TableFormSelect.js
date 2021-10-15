import React from 'react';
import {Form} from "react-bootstrap";

function TableFormSelect({name, onChange, choices, value, title, defaultValue = '', edit = true}) {
    if (edit) {
        return (
            <Form.Select name={name} onChange={onChange} defaultValue={defaultValue}>
                <option key="Не выбрано" value={null}>Не выбрано</option>
                {choices.map(choice => {
                    if (choice[value] == defaultValue) {
                        return <option selected key={choice[value]} value={parseInt(choice[value], 10)}>{choice[title]}</option>
                    }
                    return <option key={choice[value]} value={parseInt(choice[value], 10)}>{choice[title]}</option>
                })}
            </Form.Select>
        )
    } else {
        return (
            <Form.Select name={name} onChange={onChange}>
                <option key="Не выбрано" value={null}>Не выбрано</option>
                {choices.map(choice => {
                    return <option key={choice[value]} value={parseInt(choice[value], 10)}>{choice[title]}</option>
                })}
            </Form.Select>
        )
    }
}

export default TableFormSelect;