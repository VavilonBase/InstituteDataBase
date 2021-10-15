import React from 'react';
import {Form} from "react-bootstrap";

function FormSelectChoices({label, name, onChange, choices, defaultValue='', edit= false}) {
    if (edit) {
        return (
            <div className="row mb-3">
                <div className="col-3 text-end">
                    <Form.Label>{label}</Form.Label>
                </div>
                <div className="col">
                    <Form.Select name={name} onChange={onChange}
                                 defaultValue={defaultValue}>
                        <option key="Не выбрано" value={null}>Не выбрано</option>
                        {choices.map(choice => {
                            if (choice == defaultValue) {
                                return <option selected key={choice} value={choice}>{choice}</option>
                            }
                            return <option key={choice} value={choice}>{choice}</option>
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
                            return <option key={choice} value={choice}>{choice}</option>
                        })}
                    </Form.Select>
                </div>
            </div>
        )
    }
}

export default FormSelectChoices;