import React, { useState, useEffect } from 'react'
import API from '../../utils/api'
import Moment from 'react-moment'
import SpeakersList from '../common/SpeakersList'


const LatestActivity = (props) => {

    let [isLoading, setIsLoading] = useState(true)
    let [data, setData] = useState(null)

    useEffect(() => {
        API.get(`user/jhi-event-bridge-user-activities?email=${props.email}`)
            .then(response => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }, [props.email])

    const list = !isLoading && data.length && data.map(activity => {
        let { id, activityTime, activityName, activityType } = {...activity}
        // let { meetingStatus, streamStatus, hlsStreamURL, recordingURL } = activity.activityBridge
        let bridgeDetails = activity.activityBridge && activity.activityBridge.eventR
        let { title: eventTitle, eventBannerURL, description, speakers } = {...bridgeDetails }
        let activityObject = JSON.parse(activity.activityObject)

        return  <div className="card mg-t-20" key={id}>
                    <div className="card-body pd-20 pd-lg-25 bd-gray-100 rounded bd">
                        <div className="media align-items-center mg-b-20">
                            <div className="avatar avatar-online"><img src={ props.icon ? props.icon : 'https://via.placeholder.com/500' } className="rounded-circle" alt={ props.name } /></div>
                            <div className="media-body pd-l-15">
                                <h6 className="mg-b-3">{ props.name }</h6>
                                <span className="d-block tx-13 tx-color-03 tx-semibold">{ props.position }</span>
                            </div>
                            <span className="d-none d-sm-block tx-12 tx-color-03 align-self-start"><Moment fromNow>{activityTime}</Moment></span>
                        </div>
                        <h6 className="mg-t-20 mg-b-20">{ activityName }</h6>
                        <div className="bg-gray-800 rounded pd-10">
                            {
                                activityType==='EVENT_STREAM' && activity.activityBridge && activity.activityBridge.eventR ?
                                    <div className="media">
                                        <img src={ eventBannerURL } className="wd-200 rounded mg-r-20" alt="" />
                                        <div className="media-body">
                                            <h5 className="mg-b-15 tx-14">{ eventTitle }</h5>
                                            { speakers && speakers.length ? <SpeakersList expand={ true } speakers={ speakers } /> : null }
                                            { description }
                                        </div>
                                    </div> :
                                    (
                                        activityType==='ASKED_QUESTION' ?
                                            <div className="tx-medium text-center tx-white tx-14">
                                                <p>{ activityObject.question }</p>
                                                <p className="tx-12">
                                                    <span>{ activityObject.email }</span> 
                                                    <span className="tx-10 tx-gray-300 mg-l-10"><Moment format="LT">{ activityObject.questionDate }</Moment></span>
                                                </p>
                                            </div> :
                                            null
                                    )
                            }
                        </div>
                    </div>
                </div>
    })

    return (
        <div>
            <h6 className="tx-16 tx-spacing-1 tx-bold mg-b-0">Lastest</h6>
            { !isLoading ? (data.length ? list : <div className="mg-t-50 tx-16">No Activity!</div>) : <div className="mg-t-50">Loading...</div> }
            
        </div>
    )
}

export default LatestActivity
