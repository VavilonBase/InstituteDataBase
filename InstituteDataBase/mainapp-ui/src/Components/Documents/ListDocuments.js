import React, { useEffect, useState } from "react";
import axios from "axios";
import MyTable from "../AdditionalComponents/MyTable";
import { Link } from "react-router-dom";
import ModalDelete from "../AdditionalComponents/ModalDelete";

function ListDocuments() {
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
        getDocuments();
    }, []);

    //Get data
    function getDocuments() {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/documents/",
        }).then((response) => {
            setTableData(
                response.data.map((data) => {
                    return {
                        id: data.id,
                        data: [data.title],
                        links: {
                            edit: `/documents/edit/${data.id}`,
                            delete: `/documents/delete/${data.id}`,
                        },
                    };
                })
            );
        });
    }
    function getDocument(id) {
        return axios({
            method: "GET",
            url: `http://127.0.0.1:8000/api/documents/${id}`,
        });
    }

    //Before move data
    function beforeDeleteDocument(id) {
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
                "http://127.0.0.1:8000/api/documents/" + deletingData.id + "/"
            )
            .then(() => {
                handleDeleteModalClose();
                getDocuments();
            });
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <Link
                to={{ pathname: "/documents/add" }}
                className="btn btn-primary"
            >
                Добавить документ
            </Link>
            <MyTable
                headers={["Наименование"]}
                all_data={tableData}
                func={{ delete: beforeDeleteDocument }}
            />

            <ModalDelete
                show={viewDeleteModal}
                onHide={handleDeleteModalClose}
                onClickClose={handleDeleteModalClose}
                onClickYes={deleteData}
                dataTitle={deletingData.title}
                title={"Удаление документа"}
                label={
                    `Вы уверены, что хотите удалить документ "${deletingData.title}"?`
                }
            />
        </div>
    );
}

export default ListDocuments;
