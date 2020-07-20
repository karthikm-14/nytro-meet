import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { X } from 'react-feather'


const ImageModal = (props) => {

    const [imageObj, setImageObj] = useState({})
    const [imageSrc, setImageSrc] = useState('')

    const changeHandler = (event) => {
        const target = event.target;
        let value = target.type === 'file' ? target.files[0] : target.value;
        if(value.size && value.type.split('/')[0] === 'image') {
            setImageObj(value);
        }
    }

    const clearImageState = (keepModal) => {
        setImageObj({})
        setImageSrc('')
        if(!keepModal) {
            props.handleImageModalClose()
        }
    }

    const saveImage = () => {
        clearImageState()
        props.saveImage(imageObj)
    }

    useEffect(() => {
        if(imageObj.size) {
            let reader = new FileReader();
            reader.onload = function(e) {
                setImageSrc(e.target.result)
            }
            reader.readAsDataURL(imageObj);
        }
    }, [imageObj])

    return (
        <Modal show={ props.imageModal } backdrop="static" onHide={ clearImageState }>
            <Modal.Header closeButton>
                <Modal.Title>Share your photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={` ${ imageSrc ? 'd-none' : '' }`}>
                    <div className="ht-150 ht-100p overflow-y-auto outline-none tx-14 wd-100p align-items-center justify-content-center d-flex">
                        <label htmlFor="myfile" type="button" className="btn btn-outline-primary bg-primary tx-white">Select image to share</label>
                        <input type="file" id="myfile" name="imageObj" className="d-none" accept="images/*" onChange={ changeHandler }></input>
                    </div>
                </div>
                <div className={`${ imageSrc ? '' : 'd-none' } card bg-dark text-white`}>
                    <img src={ imageSrc } className="card-img" id="post-thumbnail" alt="" />
                    <X className="pos-absolute r-10 z-index-10 t-10 bg-gray-500 rounded-50 pd-5 cursor-pointer" 
                        size={30} 
                        onClick={ () => clearImageState(true) }
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" disabled={`${imageSrc ? '' : 'disabled'}`} onClick={ saveImage }>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ImageModal
