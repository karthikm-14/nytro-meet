import React from 'react'
import StreamingInfo from './StreamingInfo'

const VideoModal = (props) => {
    
    return (
        <div className="modal fade" id="videoModal" tabIndex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
            <div className="modal-dialog-centered modal-dialog modal-lg" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="videoModalLabel">{ props.event ? props.event.title : null }</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {
                        props.event ?
                        <video width="100%" height="auto" autoPlay controls>
                            <source src={ props.event.link } type="video/mp4" />
                            Your browser does not support the video tag.
                        </video> :
                        null
                    }   
                </div>
                <div className="modal-footer">
                    {
                        props.event ? 
                            <div className="card-body pd-0 ">
                                <StreamingInfo event={props.event} />
                            </div> :
                            null
                    }
                </div>
                </div>
            </div>
        </div>
    )
}

export default VideoModal
