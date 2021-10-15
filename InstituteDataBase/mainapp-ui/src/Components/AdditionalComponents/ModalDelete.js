import React from "react";
import {Modal, Button} from 'react-bootstrap'

const ModalDelete = ({ show, onHide, onClickClose, onClickYes, title, label }) => (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{label}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClickClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onClickYes}>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    )
export default ModalDelete;

{

}
