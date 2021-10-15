import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

function MyTable({ headers = [], all_data = [], func = {} }) {
    if (headers.length === 0) {
        return (
            <div>
                <h2>Нет заголовков</h2>
            </div>
        );
    } else if (all_data.length === 0) {
        return (
            <Table className="table table-striped" style={{ width: "auto" }}>
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Действия</th>
                </tr>
                </thead>
            </Table>
        );
    } else {
        function editData(e) {
            const id = e.target.parentNode.id;
            if (func.edit) {
                e.preventDefault();
                func.edit(id);
            }
        }

        function deleteData(e) {
            const id = e.target.parentNode.id;
            if (func.delete) {
                e.preventDefault();
                func.delete(id);
            }
        }
        return (
            <Table className="table table-striped w-50">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {all_data.map((data, index) => (
                    <tr key={index}>
                        {data.data.map((column_data, index) => (
                            <td key={index}>
                                <span className="text">{column_data}</span>
                            </td>
                        ))}
                        <td>
                            <div
                                id={data.id}
                                className="btn-group"
                                role="group"
                                aria-label="Basic example"
                            >
                                <Link
                                    to={{ pathname: data.links.edit }}
                                    className="btn btn-primary small"
                                    onClick={editData}
                                >
                                    Изменить
                                </Link>

                                <Link
                                    to={{ pathname: data.links.delete }}
                                    className="btn btn-danger small"
                                    onClick={deleteData}
                                >
                                    Удалить
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    }
}

export default MyTable;
