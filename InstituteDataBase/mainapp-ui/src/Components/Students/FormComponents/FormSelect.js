import React from 'react';
import {Form} from "react-bootstrap";

function FormSelect({label, name, onChange, choices, value, title,defaultValue = '', edit = true}) {
    if (edit) {
        return (
            <div className="row mb-3">
                <div className="col-3 text-end">
                    <Form.Label>{label}</Form.Label>
                </div>
                <div className="col">
                    <Form.Select name={name} onChange={onChange} defaultValue={defaultValue}>
                        <option key="Не выбрано" value={null}>Не выбрано</option>
                        {choices.map(choice => {
                            if (choice[value] == defaultValue) {
                                return <option selected key={choice[value]} value={parseInt(choice[value], 10)}>{choice[title]}</option>
                            }
                            return <option key={choice[value]} value={parseInt(choice[value], 10)}>{choice[title]}</option>
                        })}
                    </Form.Select>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row mb-3">
                <div className="col-3 text-end">
                    <Form.Label>{label}</Form.Label>
                </div>
                <div className="col">
                    <Form.Select name={name} onChange={onChange}>
                        <option key="Не выбрано" value={null}>Не выбрано</option>
                        {choices.map(choice => {
                            return <option key={choice[value]} value={parseInt(choice[value], 10)}>{choice[title]}</option>
                        })}
                    </Form.Select>
                </div>
            </div>
        )
    }
}

export default FormSelect;