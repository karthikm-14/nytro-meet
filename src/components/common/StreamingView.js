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
        </Fragment>
    )
}

export default StreamingView
