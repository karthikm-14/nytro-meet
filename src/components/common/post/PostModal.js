import React, { Fragment, useState, useEffect } from 'react'
import DiscardModal from './DiscardModal'
import { Modal, Button } from 'react-bootstrap'
import OpengraphReactComponent from 'opengraph-react'
import { Image, X, Video, FileText } from 'react-feather'
import ReactQuill from 'react-quill'
import OpenGraphPreview from './OpenGraphPreview'
import Spinner from './Spinner'


const PostModal = (props) => {

    // const [discardModal, setDiscardModal] = useState(false)
    const [imageSrc, setImageSrc] = useState('')
    const [videoSrc, setVideoSrc] = useState('')
    const [fileSrc, setFileSrc] = useState('')
    const formats = []

    const handlediscardModalShow = () => {
        // setDiscardModal(true)
    }

    // const handlediscardModalClose = () => {
    //     setDiscardModal(false)
    // }

    const clearVideoSrc = () => {
        setVideoSrc('')
        props.clearVideoObj()
    }
    const clearImageSrc = () => {
        setImageSrc('')
        props.clearImageObj()
    }
    const clearFileSrc = () => {
        setFileSrc('')
        props.clearFileObj()
    }

    useEffect(() => {
        if(props.imageObj.size) {
            let reader = new FileReader();
            reader.onload = function(e) {
                setImageSrc(e.target.result)
            }
            reader.readAsDataURL(props.imageObj);
        }
        if(props.videoObj.size) {
            let blobURL = URL.createObjectURL(props.videoObj);
            setVideoSrc(blobURL)
        }
        if(props.fileObj.size) {
            let blobURL = URL.createObjectURL(props.fileObj);
            setFileSrc(blobURL)
        }
        if(!props.postModal) {
            setImageSrc('')
            setVideoSrc('')
            setFileSrc('')
        }
    }, [props.fileObj, props.imageObj, props.postModal, props.videoObj])

    return (
        <Fragment>

            <Modal show={ props.postModal } backdrop="static" onHide={ !props.isPosting ? props.handlePostModalClose : null } dialogClassName="modal-dialog wd-650-f mx-wd-100p">
                <Modal.Header closeButton>
                    <Modal.Title>Create a post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="bg-white">
                        <ReactQuill value={ props.shortDescription }
                                    theme=''
                                    onChange={ props.handleChange }
                                    formats={formats}
                                    placeholder="What do you want to share?"
                        />
                        {
                            props.type === 'image' ?
                                <div className={`${ imageSrc ? '' : 'd-none' } card bg-dark text-white`}>
                                    <img src={ imageSrc } className="card-img" id="post-thumbnail" alt="" />
                                    <X className="pos-absolute r-10 z-index-10 t-10 bg-gray-500 rounded-50 pd-5 cursor-pointer" 
                                        size={30} 
                                        onClick={ clearImageSrc }
                                    />
                                </div> :
                                null
                        }
                        {
                            videoSrc  ?
                                <div className={`${ videoSrc ? '' : 'd-none' } card bg-dark text-white`}>
                                    <video controls className="wd-100p" id="post-thumbnail">
                                        <source src={videoSrc} />
                                        Sorry, your browser doesn't support embedded videos.
                                    </video>
                                    <X className="pos-absolute r-10 z-index-10 t-10 bg-gray-500 rounded-50 pd-5 cursor-pointer" 
                                        size={30} 
                                        onClick={ clearVideoSrc }
                                    />
                                </div> :
                                null
                        }
                        {
                            fileSrc  ?
                                <div className={`${ fileSrc ? '' : 'd-none' } card bg-dark text-white`}>
                                    <div class="card card-file">
                                        <div class="card-file-thumb tx-danger tx-100 text-center">
                                            <i class="far fa-file-pdf"></i>
                                        </div>
                                        <div class="card-body">
                                            <h6><a href={ fileSrc } target="_blank" class="link-02">{ props.fileObj.name }</a></h6>
                                        </div>
                                    </div>
                                    <X className="pos-absolute r-10 z-index-10 t-10 bg-gray-500 rounded-50 pd-5 cursor-pointer" 
                                        size={30} 
                                        onClick={ clearFileSrc }
                                    />
                                </div> :
                                null
                        }
                        { 
                            props.ogLink && 
                            <div className="pos-relative">
                                <OpengraphReactComponent  
                                    site={ props.ogLink }  
                                    appId='10283a76-e6d7-45d3-b7c8-3b4b39b81029'  
                                    onlyFetch
                                    loader= { <Spinner /> }
                                    size={'large'}    
                                >
                                    <OpenGraphPreview setOgData={ props.setOgData } clearOgData={ props.clearOgData } />
                                </OpengraphReactComponent>
                            </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                        <div>
                            <button disabled={`${props.type ? 'disabled' : ''}`} type="button" className="btn btn-primary btn-icon" onClick={ () => !props.type && props.setImageModal(true) }>
                                <Image />
                            </button>
                            <button disabled={`${props.type ? 'disabled' : ''}`} type="button" className="btn btn-primary btn-icon mg-x-5" onClick={ () => !props.type && props.setVideoModal(true) }>
                                <Video />
                            </button>
                            <button disabled={`${props.type ? 'disabled' : ''}`} type="button" className="btn btn-primary btn-icon" onClick={ () => !props.type && props.setFileModal(true) }>
                                <FileText />
                            </button>
                        </div>
                        <div>
                            <Button disabled={`${props.shortDescription ? '' : 'disabled'}`} variant="primary" onClick={ !props.isPosting ? props.handlePostSponsorContent : null }>
                                {
                                    props.isPosting ?
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="spinner-border text-info wd-20 ht-20 mg-r-10" role="status">
                                                <span className="sr-only">Shring...</span>
                                            </div>
                                            <span>Sharing ...</span>
                                        </div> :
                                        'Post'
                                }
                            </Button>
                        </div>
                </Modal.Footer>
            </Modal>

            {/* <DiscardModal discardModal= { discardModal } handlediscardModalClose= { handlediscardModalClose } /> */}
        </Fragment>
    )

}

export default PostModal
