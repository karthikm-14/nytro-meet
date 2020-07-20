import React, { useState, useEffect } from 'react'
import { Edit3, Image, Video, FileText } from 'react-feather'
import PostModal from './PostModal'
import API from '../../../utils/api'
import ImageModal from './ImageModal'
import VideoModal from './VideoModal'
import FileModal from './FileModal'


function SharePost(props) {

    const [postModal, setPostModal] = useState(false)
    const [imageModal, setImageModal] = useState(false)
    const [videoModal, setVideoModal] = useState(false)
    const [fileModal, setFileModal] = useState(false)
    const [shortDescription, setShortDescription] = useState('')
    const [type, setType] = useState('')
    const [imageObj, setImageObj] = useState({})
    const [videoObj, setVideoObj] = useState({})
    const [fileObj, setFileObj] = useState({})
    const [ogLink, setOgLink] = useState('')
    const [ogData, setOgData] = useState({})
    const [isPosting, setIsPosting] = useState(false)

    // close post modal
    const handlePostModalClose = () => {
        setPostModal(false)
        clearState()
    }

    // clear all state data
    const clearState = () => {
        setShortDescription('')
        setType('')
        setImageObj({})
        setVideoObj({})
        setFileObj({})
        setOgLink('')
        setOgData({})
    }

    // check for any links in description after 3s on update of description
    useEffect(() => {
        if(postModal && !imageObj.size && !videoObj.size && !fileObj.size) {
            const delayDebounceFn = setTimeout(() => {
                const regex = /((?:https?:|www\.)[^\s]+)/g;
                const str = document.getElementsByClassName('ql-editor')[0].innerText

                let m = str.match(regex);

                if (m) {
                    let firstLink = m.filter((match, groupIndex) => {
                        return groupIndex === 0
                    });
                    setOgLink(firstLink[0])
                    setType('article')
                }
            }, 2000)
        
            return () => clearTimeout(delayDebounceFn)
        }
      }, [shortDescription, postModal, imageObj, videoObj, fileObj.size])


    // update description to state
    const handleChange = (value) => {
        setShortDescription(value)
    }

    // update imageObj
    const saveImageObj = (obj) => {
        setType('image')
        setImageObj(obj)
        setPostModal(true)
    }

    const clearImageObj = () => {
        setType('')
        setImageObj({})
    }

    // update videoObj
    const saveVideoObj = (obj) => {
        setType('video')
        setVideoObj(obj)
        setPostModal(true)
    }

    const clearVideoObj = () => {
        setType('')
        setVideoObj({})
    }

    // update fileObj
    const saveFileObj = (obj) => {
        setType('file')
        setFileObj(obj)
        setPostModal(true)
    }

    const clearFileObj = () => {
        setType('')
        setFileObj({})
    }
    
    const clearOgData = () => {
        setType('')
        setOgLink('')
        setOgData({})
    }

    // post sponsor content and get sponsor content
    const handlePostSponsorContent = () => {
        setIsPosting(true)
        if((type === 'image' && imageObj.size) || (type === 'video' && videoObj.size) || (type === 'file' && fileObj.size)) {
            let formData = new FormData();
            formData.append('shortDescription', shortDescription)
            formData.append('file', type === 'image' ? imageObj : (type === 'video' ? videoObj : fileObj))
            formData.append('sponsor_id', props.sponsorId)
            // post file then post the actual post
            API.post('user/jhi-event-upload-sponsor-post-media', formData , { headers: {'Content-Type': 'multipart/form-data' }})
            .then( response => {
                if (type === 'file' && fileObj.size) {
                    response.data.title = fileObj.name
                }
                postAllContent(response.data)
            })
            .catch(() => {
                setIsPosting(false)
                alert('Oops! something went wrong, Please try again.')
            })
        } else if (type === 'article' && ogLink) {
            let postObj = {
                title: ogData.title,
                type: 'article',
                siteName: ogData.site_name,
                imageURL: ogData.image,
                imageSecureURL: ogData.image,
                url: ogData.url,
                description: ogData.description
            }
            postAllContent(postObj)
        } else {
            postAllContent()
        }
    }

    const postAllContent = (response) => {
        let { title, type, url, siteName, description='<p></p>', imageURL, imageSecureURL, mediaContentLocation, mediaContentSize, mediaContentMimeType } = {...response}
        if(shortDescription) {
            API.post('user/jhi-event-sponsor-post-contents', {
                shortDescription,
                description,
                url,
                title,
                type,
                siteName,
                imageURL,
                imageSecureURL,
                mediaContentLocation,
                mediaContentSize,
                mediaContentMimeType,
                "sponsor": {
                    "id": props.sponsorId
                }
            })
            .then(response => {
                handlePostModalClose()
                props.getPosts()
                setIsPosting(false)
            })
            .catch(response => alert('Oops! something went wrong, Please try again.'));
        }
    }


    return (
        <div className="profile-update-option bg-gray-900 bd bd-gray-100 ht-50 bd d-flex justify-content-end mg-b-20 mg-lg-b-25 rounded">
            <div className="d-flex align-items-center pd-x-20 mg-r-auto">
                <Edit3 /> 
                <div className="link-03 mg-l-10 cursor-pointer" onClick={ () => setPostModal(true) }>
                    <span className="d-none d-sm-inline">Share an</span> Update
                </div>
            </div>
            <div className="wd-50 bd-l d-flex align-items-center justify-content-center" onClick={ () => setImageModal(true) }>
                <div className="link-03 cursor-pointer" data-toggle="tooltip" title="Publish Photo"><Image /> </div>
            </div>
            <div className="wd-50 bd-l d-flex align-items-center justify-content-center" onClick={ () => setVideoModal(true) }>
                <div className="link-03 cursor-pointer" data-toggle="tooltip" title="Publish Video"><Video /> </div>
            </div>
            <div className="wd-50 bd-l d-flex align-items-center justify-content-center" onClick={ () => setFileModal(true) }>
                <div className="link-03 cursor-pointer" data-toggle="tooltip" title="Write an Article"><FileText /> </div>
            </div>

            
            <PostModal  postModal={ postModal }
                        shortDescription= { shortDescription }
                        imageObj={ imageObj }
                        clearImageObj={ clearImageObj }
                        setImageModal={ setImageModal }
                        videoObj={ videoObj }
                        clearVideoObj={ clearVideoObj }
                        setVideoModal={ setVideoModal }
                        fileObj={ fileObj }
                        clearFileObj={ clearFileObj }
                        setFileModal={ setFileModal }
                        ogLink={ ogLink }
                        clearOgData={ clearOgData }
                        setOgData={ setOgData }
                        type={ type }
                        handleChange={ handleChange } 
                        handlePostModalClose={ handlePostModalClose }  
                        handlePostSponsorContent={ handlePostSponsorContent }
                        isPosting={ isPosting }
            />

            <ImageModal imageModal={ imageModal }  
                        handleImageModalClose={ () => setImageModal(false) }
                        saveImage={ saveImageObj }
                        type={ type } />

            <VideoModal videoModal={ videoModal }  
                        handleVideoModalClose={ () => setVideoModal(false) }
                        saveVideo={ saveVideoObj }
                        type={ type } />

            <FileModal fileModal={ fileModal }  
                        handleFileModalClose={ () => setFileModal(false) }
                        saveFile={ saveFileObj }
                        type={ type } />

        </div>
    )
}

export default SharePost
