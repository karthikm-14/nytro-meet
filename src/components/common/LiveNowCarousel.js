import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpeakersList from './SpeakersList';


const LiveNowCarousel = (props) => {

    const [data, setData] = useState(props.events)

    const settings = {
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    const items = data && data.map((event,i) => {
        let { id, title, description, speakers, eventBannerURL, stage } = { ...event, ...event.speakers }
        let { meetingStatus, streamStatus, hlsStreamURL, recordingURL } = {...event.eventBridgeR}
        eventBannerURL = eventBannerURL ? eventBannerURL : '';
        
        return  <div key={id} className="card bg-dark text-white rounded-5">
                    <div 
                        className="w-100 rounded-5 card-img ht-480" 
                        style={{backgroundImage: `url(${eventBannerURL})`, backgroundSize: 'cover'}} >
                    </div>
                    <div className="card-img-overlay rounded-5">
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
                                <Link to={{pathname: `/live-now/${stage.title}`, sessionId: event.id}}>
                                    <button className="btn btn-primary mg-t-10 tx-11 tx-bold">Watch Now</button>
                                </Link>
                                :
                                (
                                    meetingStatus === 'finished' && streamStatus === 'finished' && recordingURL ?
                                    <Link to={{pathname: `/live-now/${stage.title}`, sessionId: id}}>
                                        <button className="btn btn-primary mg-t-10 tx-11 tx-bold">Watch Now</button>
                                    </Link> :
                                    null
                                )
                            }
                        </div>
                    </div>
                </div>
    })

    return (
        <Fragment>
            <Slider {...settings}>
                { items }
            </Slider>
        </Fragment>
    )
}


export default LiveNowCarousel
