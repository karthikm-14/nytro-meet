import React, { Fragment, useState, useEffect } from 'react'
import StreamingInfo from './StreamingInfo'
import SpeakersList from './SpeakersList'
import VideoPlayer from './VideoPlayer'
import { User } from 'react-feather'
import API from '../../utils/api'


const StreamingView = (props) => {

    let [liveAudienceCount, setLiveAudienceCount] = useState(0)

    useEffect(() => {
        getContinuousBridgeStatus(props.event.eventBridgeR.id)
        const interval = setInterval(() => {
                            getContinuousBridgeStatus(props.event.eventBridgeR.id)
                        }, 10000);
        return () => clearInterval(interval);
    }, [props.event.eventBridgeR.id])

    
    const getContinuousBridgeStatus = (id) => {
        API.get(`user/jhi-event-bridge-status/${id}`)
            .then(response => {
                let item = response.data.find(item => {
                    return item.activity_name == 'Is currently watching...'
                })
                setLiveAudienceCount(item.no_of_users)
            })
            .catch(response => console.log(response));
    }

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
                    <div>
                        <span className="btn-danger d-inline-flex align-items-center p-0 px-2 tx-12 tx-bold mg-b-10 position-absolute z-index-10 mg-10">
                            <span className="d-inline-block wd-7 ht-7 bg-gray-100 rounded-circle mg-r-5"></span> LIVE
                        </span>
                        <span className="bg-black-9 d-inline-flex align-items-center p-0 px-2 tx-12 tx-bold mg-b-10 position-absolute z-index-10 mg-10 r-10 tx-white">
                            <User color="white" fill="white" size={14} /> <span className="mg-l-5">{ liveAudienceCount }</span>
                        </span>
                        <VideoPlayer { ...videoJsOptions } />
                    </div> :
                'No Streaming available!'
                
            }
        </Fragment>
    )
}

export default StreamingView
