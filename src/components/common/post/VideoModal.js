import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { X } from 'react-feather'


const VideoModal = (props) => {

    const [videoObj, setVideoObj] = useState({})
    const [videoSrc, setVideoSrc] = useState('')

    const changeHandler = (event) => {
        const target = event.target;
        let value = target.type === 'file' ? target.files[0] : target.value;
        if(value.size && value.type.split('/')[0] === 'video') {
            setVideoObj(value);
        }
    }

    const clearVideoState = (keepModal) => {
        setVideoObj({})
        setVideoSrc('')
        if(!keepModal) {
            props.handleVideoModalClose()
        }
    }

    const saveVideo = () => {
        clearVideoState()
        props.saveVideo(videoObj)
    }

    useEffect(() => {
        if(videoObj.size) {
            let blobURL = URL.createObjectURL(videoObj);
            setVideoSrc(blobURL)
        }
    }, [videoObj])

    return (
        <Modal show={ props.videoModal } backdrop="static" onHide={ clearVideoState }>
            <Modal.Header closeButton>
                <Modal.Title>Share your video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={` ${ videoSrc ? 'd-none' : '' }`}>
                    <div className="ht-150 ht-100p overflow-y-auto outline-none tx-14 wd-100p align-items-center justify-content-center d-flex">
                        <label htmlFor="myfile" type="button" className="btn btn-outline-primary bg-primary tx-white">Select video to share</label>
                        <input type="file" id="myfile" name="videoObj" className="d-none" accept="video/*" onChange={ changeHandler }></input>
                    </div>
                </div>
                <div className={`${ videoSrc ? '' : 'd-none' } card bg-dark text-white`}>
                    {   
                        videoSrc && 
                        <div>
                            <video controls id="post-thumbnail" className="wd-100p">
                                <source src={videoSrc} />
                                Sorry, your browser doesn't support embedded videos.
                            </video>
                            <X className="pos-absolute r-10 z-index-10 t-10 bg-gray-500 rounded-50 pd-5 cursor-pointer" 
                                size={30} 
                                onClick={ () => clearVideoState(true) }
                            />
                        </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" disabled={`${videoSrc ? '' : 'disabled'}`} onClick={ saveVideo }>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default VideoModal
