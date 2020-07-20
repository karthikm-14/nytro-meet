import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { X } from 'react-feather'


const FileModal = (props) => {

    const [fileObj, setFileObj] = useState({})
    const [fileSrc, setFileSrc] = useState('')

    const changeHandler = (event) => {
        const target = event.target;
        let value = target.type === 'file' ? target.files[0] : target.value;
        if(value.size && value.type.split('/')[0] === 'application') {
            setFileObj(value);
        }
    }

    const clearFileState = (keepModal) => {
        setFileObj({})
        setFileSrc('')
        if(!keepModal) {
            props.handleFileModalClose()
        }
    }

    const saveFile = () => {
        clearFileState()
        props.saveFile(fileObj)
    }

    useEffect(() => {
        if(fileObj.size) {
            let blobURL = URL.createObjectURL(fileObj);
            setFileSrc(blobURL)
        }
    }, [fileObj])

    return (
        <Modal show={ props.fileModal } backdrop="static" onHide={ clearFileState }>
            <Modal.Header closeButton>
                <Modal.Title>Share your Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={` ${ fileSrc ? 'd-none' : '' }`}>
                    <div className="ht-150 ht-100p overflow-y-auto outline-none tx-14 wd-100p align-items-center justify-content-center d-flex">
                        <label htmlFor="myfile" type="button" className="btn btn-outline-primary bg-primary tx-white">Select document to share</label>
                        <input type="file" id="myfile" name="fileObj" className="d-none" accept="application/pdf" onChange={ changeHandler }></input>
                    </div>
                </div>
                <div className={`${ fileSrc ? '' : 'd-none' } card bg-dark text-white`}>
                    <div class="card card-file">
                        <div class="card-file-thumb tx-danger tx-100 text-center">
                            <i class="far fa-file-pdf"></i>
                        </div>
                        <div class="card-body">
                            <h6><a href={ fileSrc } target="_blank" class="link-02">{ fileObj.name }</a></h6>
                        </div>
                    </div>
                    
                    <X className="pos-absolute r-10 z-index-10 t-10 bg-gray-500 rounded-50 pd-5 cursor-pointer" 
                        size={30} 
                        onClick={ () => clearFileState(true) }
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" disabled={`${fileSrc ? '' : 'disabled'}`} onClick={ saveFile }>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FileModal
