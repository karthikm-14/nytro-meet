import React, { useState } from 'react'
import { Edit3, Image, Video, FileText } from 'react-feather'
import PostModal from './PostModal'


function SharePost() {

    const [post, setPost] = useState({
        longDescription: '',
    })

    
    const [postModal, setPostModal] = useState(false)

    const handlePostModalShow = () => {
        setPostModal(true)
    }

    const handlePostModalClose = () => {
        setPostModal(false)
    }


    const changeHandler = (event) => {
        const target = event.target;
        let value = target.type === 'file' ? target.files[0] : target.value;
        const name = target.name;
        setPost({
            [name]: value
        })
        // this.setState({
        //     [name]: value
        // }, () => {
        //     if(target.type == 'file') {
        //         this.previewThumbnail(target.files[0])
        //     }
        // });

    }


    return (
        <div className="profile-update-option bg-gray-900 bd bd-gray-100 ht-50 bd d-flex justify-content-end mg-b-20 mg-lg-b-25 rounded">
            <div className="d-flex align-items-center pd-x-20 mg-r-auto">
                <Edit3 /> 
                <div className="link-03 mg-l-10 cursor-pointer" onClick={ handlePostModalShow }>
                    <span className="d-none d-sm-inline">Share an</span> Update
                </div>
            </div>
            <div className="wd-50 bd-l d-flex align-items-center justify-content-center">
                <div className="link-03 cursor-pointer" data-toggle="tooltip" title="Publish Photo"><Image /> </div>
            </div>
            <div className="wd-50 bd-l d-flex align-items-center justify-content-center">
                <div className="link-03 cursor-pointer" data-toggle="tooltip" title="Publish Video"><Video /> </div>
            </div>
            <div className="wd-50 bd-l d-flex align-items-center justify-content-center">
                <div className="link-03 cursor-pointer" data-toggle="tooltip" title="Write an Article"><FileText /> </div>
            </div>

            
            <PostModal postModal={ postModal } post={ post } changeHandler={ (event) => changeHandler(event) }  />



        </div>
    )
}

export default SharePost
