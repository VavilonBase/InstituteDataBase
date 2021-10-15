import React, { useEffect, useState } from "react";
import axios from "axios";
import MyTable from "../AdditionalComponents/MyTable";
import { Link } from "react-router-dom";
import ModalDelete from "../AdditionalComponents/ModalDelete";

function ListDisciplines() {
    //State
    const [tableData, setTableData] = useState([]);

    const [viewDeleteModal, setDeleteViewModal] = useState(false);

    const [deletingData, setDeletingData] = useState({});

    //Handle show and close modal
    const handleDeleteModalClose = () => {
        setDeleteViewModal(false);
        setDeletingData({});
    };
    const handleDeleteModalShow = () => setDeleteViewModal(true);

    //After render component
    useEffect(() => {
        getDisciplines();
    }, []);

    //Get data
    function getDisciplines() {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/disciplines/",
        }).then((response) => {
            setTableData(
                response.data.map((data) => {
                    return {
                        id: data.id,
                        data: [data.title, data.type],
                        links: {
                            edit: "/disciplines/edit/" + data.id,
                            delete: "/disciplines/delete/" + data.id,
                        },
                    };
                })
            );
        });
    }
    function getDocument(id) {
        return axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/disciplines/" + id,
        });
    }

    //Before move data
    function beforeDeleteDisciplines(id) {
        getDocument(id).then((response) => {
            setDeletingData(response.data);
            handleDeleteModalShow();
        });
    }

    //Move data
    function deleteData(e) {
        e.preventDefault();
        axios
            .delete(
                "http://127.0.0.1:8000/api/disciplines/" + deletingData.id + "/"
            )
            .then(() => {
                handleDeleteModalClose();
                getDisciplines();
            });
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <Link
                to={{ pathname: "/disciplines/add" }}
                className="btn btn-primary"
            >
                Добавить документ
            </Link>
            <MyTable
                headers={["Наименование", "Тип"]}
                all_data={tableData}
                func={{ delete: beforeDeleteDisciplines }}
            />

            <ModalDelete
                show={viewDeleteModal}
                onHide={handleDeleteModalClose}
                onClickClose={handleDeleteModalClose}
                onClickYes={deleteData}
                title={"Удаление дисциплины"}
                label={`Вы уверены, что хотите удалить дисциплину ${deletingData.title}(${deletingData.type})?`}
            />
        </div>
    );
}

export default ListDisciplines;
