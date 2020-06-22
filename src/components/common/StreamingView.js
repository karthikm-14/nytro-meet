import React, { Fragment } from 'react'
import StreamingInfo from './StreamingInfo'
import SpeakersList from './SpeakersList'
import VideoPlayer from './VideoPlayer'


const StreamingView = (props) => {
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        sources: [{
          src: props.event.eventBridgeR.hlsStreamURL,
          type: 'application/x-mpegURL'
        }]
    }

    return (
        <Fragment>
            {/* <img alt="live-now" className="w-100 rounded-5 card-img" src="/assets/images/watch-now-bg.jpg" /> */}
            {/* <VideoPlayer source={ props.event.hlsStreamURL } width='100%' height='480x'  /> */}
            {
                props.event.eventBridgeR.hlsStreamURL ?
                <VideoPlayer { ...videoJsOptions } /> :
                'No Streaming available!'
            }
            <div className="card-body pl-0 pd-t-35">
                <h6 className="card-title tx-bold tx-24">{ props.event.title }</h6>
                <p className="tx-14 tx-color-03 tx-metropolis-semi-bold">
                    { props.event.speakers && props.event.speakers.length ? <SpeakersList speakers={ props.event.speakers } /> : null }
                </p>
                <StreamingInfo event={props.event} />
            </div>
        </Fragment>
    )
}

export default StreamingView
