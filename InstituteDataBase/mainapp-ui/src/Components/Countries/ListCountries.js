import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import MyTable from "../AdditionalComponents/MyTable";
import ModalDelete from "../AdditionalComponents/ModalDelete";

function ListCountries() {
    const [tableData, setTableData] = useState([])
    const [viewDeleteModal, setViewDeleteModal] = useState(false)
    const [deletingCountry, setDeletingCountry] = useState({})

    //Handle show and close modal
    const handleDeleteModalClose = () => {
        setViewDeleteModal(false)
        setDeletingCountry({})
    }

    const handleDeleteModalOpen = () => {
        setViewDeleteModal(true)
    }

    //Before render component
    useEffect(() => {
        getCountries()
    }, [])

    //Get data
    function getCountries() {
        axios.get('http://127.0.0.1:8000/api/countries/')
            .then(response => {
                setTableData(response.data.map((country) => {
                    return {
                        'id': country.id,
                        'data': [country.name],
                        'links': {
                            'edit': `/countries/edit/${country.id}`,
                            'delete': `/countries//delete/${country.id}`
                        }
                    }
                }))
            })
            .catch(error => {
                console.log(error)
            })
    }
    function getCountry(id) {
        return axios.get(`http://127.0.0.1:8000/api/countries/${id}`)
    }

    //Before delete country
    function beforeDeleteCountry(id) {
        getCountry(id).then(response => {
            setDeletingCountry(response.data)
            handleDeleteModalOpen()
        }).catch(error => {
            console.log(error)
        })
    }

    //Delete country
    function deleteCountry(e) {
        e.preventDefault()
        axios.delete(`http://127.0.0.1:8000/api/countries/${deletingCountry.id}`)
            .then(() => {
                handleDeleteModalClose()
                getCountries()
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <Link
                to={{pathname: '/countries/add'}}
                className="btn btn-primary"
            >Добавить страну</Link>
            <MyTable
                headers={['Наименование']}
                all_data={tableData}
                func={{'delete': beforeDeleteCountry}}/>

            <ModalDelete
                show={viewDeleteModal}
                onHide={handleDeleteModalClose}
                onClickClose={handleDeleteModalClose}
                onClickYes={deleteCountry} dataTitle={deletingCountry.name}
                title={'Удаление документа'}
                label={'Вы уверены, что хотите удалить страну"' + deletingCountry.name + '"?'}/>
        </div>
    )
}

export default ListCountries;