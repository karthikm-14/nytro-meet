import React, { useState, useEffect } from 'react'

const VideoModal = (props) => {

    return (
        <div className="modal fade" id="videoModal" tabIndex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="videoModalLabel">{ props.event ? props.event.title : null }</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <video width="320" height="240" autoPlay controls>
                        <source src={ props.event ? props.event.link : null } type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default VideoModal
