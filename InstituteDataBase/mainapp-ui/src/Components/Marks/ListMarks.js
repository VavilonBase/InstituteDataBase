import React, { useEffect, useState } from "react";
import axios from "axios";
import MyTable from "../AdditionalComponents/MyTable";
import { Link } from "react-router-dom";
import ModalDelete from "../AdditionalComponents/ModalDelete";

function Marks() {
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
        getMarks();
    }, []);

    //Get data
    function getMarks() {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/marks/",
        }).then((response) => {
            setTableData(
                response.data.map((data) => {
                    return {
                        id: data.id,
                        data: [data.mark, data.view],
                        links: {
                            edit: "/marks/edit/" + data.id,
                            delete: "/marks/delete/" + data.id,
                        },
                    };
                })
            );
        });
    }
    function getMark(id) {
        return axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/marks/" + id,
        });
    }

    //Before move data
    function beforeDeleteMark(id) {
        getMark(id).then((response) => {
            setDeletingData(response.data);
            handleDeleteModalShow();
        });
    }

    //Move data
    function deleteData(e) {
        e.preventDefault();
        axios
            .delete("http://127.0.0.1:8000/api/marks/" + deletingData.id + "/")
            .then((response) => {
                handleDeleteModalClose();
                getMarks();
            });
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <Link to={{ pathname: "/marks/add" }} className="btn btn-primary">
                Добавить оценку
            </Link>
            <MyTable
                headers={["Оценка", "Представление"]}
                all_data={tableData}
                func={{ delete: beforeDeleteMark }}
            />

            <ModalDelete
                show={viewDeleteModal}
                onHide={handleDeleteModalClose}
                onClickClose={handleDeleteModalClose}
                onClickYes={deleteData}
                dataTitle={deletingData.title}
                title={"Удаление оценки"}
                label={`Вы уверены, что хотите удалить оценку "${deletingData.view}"?`}
            />
        </div>
    );
}

export default Marks;
