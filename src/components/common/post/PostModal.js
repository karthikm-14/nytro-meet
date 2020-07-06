import React, { Fragment, useState } from 'react'
import DiscardModal from './DiscardModal'
import { Modal, Button } from 'react-bootstrap'


const PostModal = (props) => {

    const [discardModal, setDiscardModal] = useState(false)

    const handlediscardModalShow = () => {
        setDiscardModal(true)
    }

    const handlediscardModalClose = () => {
        setDiscardModal(false)
    }

    return (
        <Fragment>

            <Modal show={ props.postModal } onHide={ handlediscardModalShow }>
                <Modal.Header closeButton>
                    <Modal.Title>Create a post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea className="ht-150 ht-100p overflow-y-auto outline-none tx-14 wd-100p" 
                        placeholder="What do you want to talk about?" 
                        aria-multiline="true" data-test-ql-editor-contenteditable="true"
                        value={ props.post.longDescription }
                        name="longDescription"
                        onChange= { (event) => props.changeHandler(event) }
                    >
                    </textarea>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary">
                    Post
                </Button>
                </Modal.Footer>
            </Modal>
            
            <DiscardModal discardModal= { discardModal } handlediscardModalClose= { handlediscardModalClose } />
        </Fragment>
    )

}

export default PostModal
