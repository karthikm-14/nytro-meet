import React, { Fragment } from 'react'
import SpeakersList from './SpeakersList'


const WatchNow = (props) => {
    
    let { title, description, speakers, status, eventBannerURL } = {...props.event}
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
                            { status === 'LIVE' ? 
                                <span className="btn-danger d-inline-flex align-items-center p-0 px-2 tx-12 tx-bold mg-b-10">
                                    <span className="d-inline-block wd-7 ht-7 bg-gray-100 rounded-circle mg-r-5"></span> LIVE
                                </span> :
                                null
                            }
                            <h5 className="card-title tx-36 tx-light">{ title }</h5>
                            <h6 className="card-subtitle mb-3 mt-2 text-muted">
                                <SpeakersList expand={ true } speakers={ speakers } />
                            </h6>
                            <p className="card-text">{ description } </p>
                            <a href="#" className="btn btn-primary mg-t-10 tx-11 tx-bold">Watch Now</a>
                        </div>
                        </div>
                    </div> :
                    'No Live events happening...'
            }
        </Fragment>
    )
}

export default WatchNow
