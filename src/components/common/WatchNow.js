import React, { Fragment } from 'react'
import SpeakersList from './SpeakersList'
import { Link } from 'react-router-dom'
// import wowzaJS from '../../modules/wowza'


const WatchNow = (props) => {

    let { id, title, description, speakers, eventBannerURL, stage } = {...props.event}
    let { meetingStatus, streamStatus, hlsStreamURL } = {...props.event.eventBridgeR}
    eventBannerURL = eventBannerURL ? eventBannerURL : "/assets/images/watch-now-bg.jpg";
    
    return (
        <Fragment>
            {
                props.event.title ?
                    <div className="card bg-dark text-white">
                        <div 
                            className="w-100 rounded-5 card-img ht-480" 
                            style={{backgroundImage: `url(${eventBannerURL})`, backgroundSize: 'cover'}} >
                        </div>
                        <div className="card-img-overlay">
                            <div className="card-body pos-absolute b-20">
                                { 
                                    meetingStatus === 'started' && streamStatus === 'started' && hlsStreamURL ? 
                                    <span className="btn-danger d-inline-flex align-items-center p-0 px-2 tx-12 tx-bold mg-b-10">
                                        <span className="d-inline-block wd-7 ht-7 bg-gray-100 rounded-circle mg-r-5"></span> LIVE
                                    </span> :
                                    null
                                }
                                <h5 className="card-title tx-36 tx-light">{ title }</h5>
                                <h6 className="card-subtitle mb-3 mt-2 text-muted">
                                    { speakers && speakers.length ? <SpeakersList expand={ true } speakers={ speakers } /> : null }
                                </h6>
                                <p className="card-text">{ description } </p>
                                {
                                    meetingStatus === 'started' && streamStatus === 'started' && hlsStreamURL ?
                                    <Link to={{pathname: `/live-now/${stage.title}`, event: props.event}}>
                                        <button className="btn btn-primary mg-t-10 tx-11 tx-bold">Watch Now</button>
                                    </Link>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div> :
                    <div className="card bg-dark text-white ht-480 d-flex align-items-center justify-content-center">
                        <p>No Live Session happening now !</p>
                    </div>
            }
        </Fragment>
    )
}

export default WatchNow
