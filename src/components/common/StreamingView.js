import React, { Fragment } from 'react'
import StreamingInfo from './StreamingInfo'
import SpeakersList from './SpeakersList'
import VideoPlayer from './VideoPlayer'


const StreamingView = (props) => {
    
    return (
        <Fragment>
            {/* <img alt="live-now" className="w-100 rounded-5 card-img" src="/assets/images/watch-now-bg.jpg" /> */}
            {/* <VideoPlayer source={ hlsStreamURL } width='100%' height='480x'  /> */}
            <div className="card-body pl-0 pd-t-35">
                <h6 className="card-title tx-bold tx-24">{ props.event.title }</h6>
                <p className="tx-14 tx-color-03 tx-metropolis-semi-bold">
                    <SpeakersList speakers={ props.event.speakers } />
                </p>
                <StreamingInfo event={props.event} />
            </div>
        </Fragment>
    )
}

export default StreamingView
