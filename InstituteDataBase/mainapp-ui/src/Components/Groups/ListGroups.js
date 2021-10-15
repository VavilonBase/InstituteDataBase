import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import MyTable from "../AdditionalComponents/MyTable";
import ModalDelete from "../AdditionalComponents/ModalDelete";


function ListGroups() {
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
        getGroups()
    }, [])

    // FUNCTIONS

    // GET GROUPS
    function getGroups() {
        axios(
            {
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/groups/'
            }
        ).then(response => {
            setTableData(
                response.data.map(group => {
                    return {
                        id: group.id,
                        data: [group.title, `${group.direction.title}(${group.direction.code})`],
                        links: {
                            edit: `/groups/edit/${group.id}`,
                            delete: `/groups/delete/${group.id}`
                        }
                    }
                })
            )
        })
    }

    // GET GROUP
    function getGroup(id) {
        return axios(
            {
                method: 'GET',
                url: `http://127.0.0.1:8000/api/groups/${id}`
            }
        )
    }

    // BEFORE DELETE GROUP
    function beforeDeleteGroup(id) {
        getGroup(id).then(response => {
            setDeletingData(response.data)
            handlerDeleteModalShow()
        })
    }

    // DELETE GROUP
    function deleteGroup(e) {
        e.preventDefault()
        axios(
            {
                method: 'DELETE',
                url: `http://127.0.0.1:8000/api/groups/${deletingData.id}`
            }
        ).then(() => {
            setViewDeleteModal(false)
            getGroups()
        })
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <Link to={{ pathname: "/groups/add" }} className="btn btn-primary">
                Добавить группу
            </Link>
            <MyTable
                headers={["Группа", "Направление"]}
                all_data={tableData}
                func={{ delete: beforeDeleteGroup }}
            />

            <ModalDelete
                show={viewDeleteModal}
                onHide={handlerDeleteModalClose}
                onClickClose={handlerDeleteModalClose}
                onClickYes={deleteGroup}
                dataTitle={deletingData.title}
                title={"Удаление группы"}
                label={`Вы уверены, что хотите удалить группу "${deletingData.title}"?`}
            />
        </div>
    )
}

export default ListGroups