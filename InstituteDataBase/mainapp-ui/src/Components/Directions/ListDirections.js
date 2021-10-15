import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import MyTable from "../AdditionalComponents/MyTable";
import ModalDelete from "../AdditionalComponents/ModalDelete";


function ListDirections() {
    // STATE
    const [tableData, setTableData] = useState([])
    const [viewDeleteModal, setViewDeleteModal] = useState(false)
    const [deletingData, setDeletingData] = useState({})

    // HANDLERS
    const handlerDeleteModalShow = () => setViewDeleteModal(true)
    const handlerDeleteModalClose = () => {
        setViewDeleteModal(false);
        setDeletingData({});
    };
    // AFTER RENDER COMPONENT
    useEffect(() => {
        getDirections()
    }, [])

    // FUNCTIONS

    // GET DIRECTIONS
    function getDirections() {
        axios(
            {
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/directions/'
            }
        ).then(response => {
            setTableData(
                response.data.map(direction => {
                    return {
                        id: direction.id,
                        data: [direction.title, direction.code, direction.director],
                        links: {
                            edit: `/directions/edit/${direction.id}`,
                            delete: `/directions/delete/${direction.id}`
                        }
                    }
                })
            )
        })
    }

    // GET DIRECTION
    function getDirection(id) {
        return axios(
            {
                method: 'GET',
                url: `http://127.0.0.1:8000/api/directions/${id}`
            }
        )
    }

    // BEFORE DELETE DIRECTION
    function beforeDeleteDirection(id) {
        getDirection(id).then(response => {
            setDeletingData(response.data)
            handlerDeleteModalShow()
        })
    }

    // DELETE DIRECTION
    function deleteDirection(e) {
        e.preventDefault();
        axios
            .delete("http://127.0.0.1:8000/api/directions/" + deletingData.id + "/")
            .then((response) => {
                handlerDeleteModalClose();
                getDirections();
            });
        e.preventDefault()
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <Link to={{ pathname: "/directions/add" }} className="btn btn-primary">
                Добавить направление
            </Link>
            <MyTable
                headers={['Направление', 'Код направления', 'Директор']}
                all_data={tableData}
                func={{ delete: beforeDeleteDirection }}
            />

            <ModalDelete
                show={viewDeleteModal}
                onHide={handlerDeleteModalClose}
                onClickClose={handlerDeleteModalClose}
                onClickYes={deleteDirection}
                dataTitle={deletingData.title}
                title={"Удаление направления"}
                label={`Вы уверены, что хотите удалить направление "${deletingData.title}"?`}
            />
        </div>
    )
}

export default ListDirections