import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const DiscardModal = (props) => {

    return (
        <Modal show={ props.discardModal } onHide={ props.handlediscardModalClose }>
            <Modal.Header closeButton>
                <Modal.Title>Discard draft</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You haven’t finished your post yet. Are you sure you want to leave and discard your draft?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">
                    Go Back
                </Button>
                <Button variant="primary">
                    Discard
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DiscardModal
