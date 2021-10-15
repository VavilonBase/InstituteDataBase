import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import MyTable from "../AdditionalComponents/MyTable";
import ModalDelete from "../AdditionalComponents/ModalDelete";


function ListStudents() {
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
        getStudents()
    }, [])

    // FUNCTIONS

    // GET STUDENTS
    function getStudents() {
        axios(
            {
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/students/'
            }
        ).then(response => {
            console.log(response.data)
            setTableData(
                response.data.map(student => {
                    let lastName = student.last_name ? student.last_name : ''
                    let firstName = student.first_name ? student.first_name : ''
                    let middleName = student.middle_name ? student.middle_name : ''
                    let FIO = `${lastName} ${firstName} ${middleName}`
                    let groupTitle = student.group ? student.group.title : ''
                    let studentBirthData = student.birth_date ? student.birth_date: ''
                    return {
                        id: student.id,
                        data: [FIO, groupTitle, studentBirthData],
                        links: {
                            edit: `/students/edit/${student.id}`,
                            delete: `/students/delete/${student.id}`
                        }
                    }
                })
            )
        })
    }

    // GET STUDENT
    function getStudent(id) {
        return axios(
            {
                method: 'GET',
                url: `http://127.0.0.1:8000/api/students/${id}`
            }
        )
    }

    // BEFORE DELETE STUDENT
    function beforeDeleteGroup(id) {
        getStudent(id).then(response => {
            setDeletingData(response.data)
            handlerDeleteModalShow()
        })
    }

    // DELETE STUDENT
    function deleteGroup(e) {
        e.preventDefault()
        axios(
            {
                method: 'DELETE',
                url: `http://127.0.0.1:8000/api/students/${deletingData.id}`
            }
        ).then(() => {
            setViewDeleteModal(false)
            getStudents()
        })
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <Link to={{ pathname: "/students/add" }} className="btn btn-primary">
                Добавить студента
            </Link>
            <MyTable
                headers={["ФИО", "Группа", "Дата рождения"]}
                all_data={tableData}
                func={{ delete: beforeDeleteGroup }}
            />

            <ModalDelete
                show={viewDeleteModal}
                onHide={handlerDeleteModalClose}
                onClickClose={handlerDeleteModalClose}
                onClickYes={deleteGroup}
                dataTitle={deletingData.last_name}
                title={"Удаление студента"}
                label={`Вы уверены, что хотите удалить студента "${deletingData.last_name}"?`}
            />
        </div>
    )
}

export default ListStudents