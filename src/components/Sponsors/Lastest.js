import React, { useState, useEffect } from 'react'
import API from '../../utils/api'
import Moment from 'react-moment'
import SpeakersList from '../common/SpeakersList'
import SharePost from '../common/post/SharePost'
import DOMPurify from 'dompurify';
import ZoomImg from '../common/post/ZoomImg'


const Latest = (props) => {

    let [isLoading, setIsLoading] = useState(true)
    let [data, setData] = useState(null)
    const sanitizer = DOMPurify.sanitize;

    useEffect(() => {
        getPosts(props.id)
    }, [props.id])

    const getPosts = (id) => {
        API.get(`user/jhi-event-post-contents-for-sponsor/${id}`)
        .then(response => {
            setData(response.data)
            setIsLoading(false)
        })
        .catch(response => console.log(response));
    }

    const truncateDescription = (description) => {
        description = description || "";
        if(description.length < 125) {
          return description
        } else {
          description = description.slice(0, 123);
          description += '...';
          return description
        }
    }

    const splitLink = (url) => {
        return url.split('/')[2]
    }

    const list = !isLoading && data.length && data.map(activity => {
        let {type, title, id, url, createdDate, description, shortDescription, articleImage, articleTitle, 
                articleCategory, articleDescription, mediaContentMimeType, mediaContentLocation,
                imageSecureURL, imageURL
            } = activity

        return  <div className="card mg-t-20" key={id}>
                    <div className="card-body pd-20 pd-lg-25 bd-gray-100 rounded bd">
                        <div className="media align-items-center mg-b-20">
                            <div className="avatar avatar-online bg-white rounded-50">
                                <img src={ props.icon ? props.icon : 'https://via.placeholder.com/500' } className="rounded-circle img-fit-contain-f pd-5" alt={ props.name } />
                            </div>
                            <div className="media-body pd-l-15">
                                <h6 className="mg-b-3">{ props.name }</h6>
                                <span className="d-block tx-13 tx-color-03 tx-semibold">{ props.website }</span>
                            </div>
                            <span className="d-none d-sm-block tx-12 tx-color-03 align-self-start"><Moment fromNow>{createdDate}</Moment></span>
                        </div>
                        <div className="tx-white tx-14 tx-normal" dangerouslySetInnerHTML={{ __html: sanitizer(shortDescription) }}/>
                        {
                          mediaContentMimeType && mediaContentMimeType.split('/')[0] === 'image' && (imageSecureURL || imageURL)  ? 
                            <ZoomImg
                                imageWidth={600}
                                imageHeight={400}
                                className="wd-100p rounded"
                                src={ imageSecureURL ? imageSecureURL : (imageURL ? imageURL : null) }
                            /> :
                            (
                                type === 'article' ?
                                    <div className="outerWrapperSmall bg-gray-100 wd-100p-f rounded">
                                        <a href={url} target="_blank" className="d-flex justify-content-center align-items-center pd-x-10">
                                            <div style={{flex: 1}} >
                                                <div className="imgWrapperSmall">
                                                    <img className="responsiveImage" src={ imageSecureURL ? imageSecureURL : (imageURL ? imageURL : null) } alt={ title }/>
                                                </div>
                                            </div>
                                            <div className="textWrapperSmall">
                                                <h6 className="tx-black tx-bold">{ title ? title : '' }</h6>
                                                <p className="tx-gray-900 tx-14">{ truncateDescription(description) }</p>
                                                <div className="tx-12 tx-primary ">
                                                    { url ? splitLink(url) : '' }
                                                </div>
                                            </div>
                                        </a>
                                    </div> :
                                    mediaContentMimeType && mediaContentMimeType.split('/')[0] === 'video' && (imageSecureURL || imageURL)  ?
                                        <div>
                                            <video controls id="post-thumbnail" className="wd-100p">
                                                <source src={ imageSecureURL ? imageSecureURL : (imageURL ? imageURL : null) } />
                                                Sorry, your browser doesn't support embedded videos.
                                            </video>
                                        </div> : 
                                        (
                                            mediaContentMimeType && mediaContentMimeType.split('/')[0] === 'application' && (imageSecureURL || imageURL) ?
                                                <div class="card card-file">
                                                    <a href={ imageSecureURL ? imageSecureURL : (imageURL ? imageURL : null) } target="_blank" class="link-02">
                                                        <div class="card-file-thumb tx-danger tx-100 text-center">
                                                            <i class="far fa-file-pdf"></i>
                                                        </div>
                                                        <div class="card-body">
                                                            <h6>{ title }</h6>
                                                        </div>
                                                    </a>
                                                </div> :
                                                null
                                        )
                            )  
                        }
                    </div>
                </div>
    })

    return (
        <div>
            <SharePost sponsorId={ props.id } getPosts={ () => getPosts(props.id) } />
            <h6 className="tx-16 tx-spacing-1 tx-bold mg-b-0">Latest</h6>
            { !isLoading ? (data.length ? list : <div className="mg-t-50 tx-16">No Activity!</div>) : <div className="mg-t-50">Loading...</div> }
            
        </div>
    )
}

export default Latest
