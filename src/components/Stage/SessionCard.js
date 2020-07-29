import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'

const SessionCard = (props) => {

    const [userInfo, setUserInfo] = useState(props.userInfo)

    
    const items = props.data.map((event,i) => {

        let { title, description, eventBannerURL, startDate } = {...event}

        let sessionLink = null 
        if(event.eventBridgeR && event.eventBridgeR.meetingToken) {
            if(userInfo.roles.includes('moderator')) { // this check should be user role for this event
                sessionLink = <a href={`https://meet.nytro.ai/nytro_event/start_meeting.php?user_name=${userInfo.name}&user_email=${userInfo.email}&meeting_token=${event.eventBridgeR.meetingToken}&return_url=${window.location.origin}`} target="_blank" className="pos-absolute b-20 ">
                    <button className="btn btn-sm pd-x-15 btn-primary tx-12 tx-bold">
                        START SESSION
                    </button>
                </a> 
            } else if (userInfo.roles.includes('panelist') && event.eventBridgeR.bridge.toLocaleLowerCase() === 'zoom' && event.eventBridgeR.meetingStatus === 'started') {
                sessionLink = <a href={`https://meet.nytro.ai/nytro_event/join_meeting.php?user_name=${userInfo.name}&user_email=${userInfo.email}&meeting_token=${event.eventBridgeR.meetingToken}&return_url=${window.location.origin}`} target="_blank" className="pos-absolute b-20 ">
                    <button className="btn btn-sm pd-x-15 btn-primary tx-12 tx-bold">
                        JOIN SESSION
                    </button>
                </a> 
            } else if (userInfo.roles.includes('panelist') && event.eventBridgeR.bridge.toLocaleLowerCase() === 'jitsi' && event.eventBridgeR.meetingStatus === 'started') {
                sessionLink =  <button className="btn btn-sm pd-x-15 btn-primary tx-12 tx-bold" onClick={ (data) => props.getJoinSessionDetails(event, userInfo) }>
                        JOIN SESSION
                    </button>
            }
        }

        return <div key={event.id} className="d-flex col-md-4 mg-b-10 wd-100p">
                    <div className="card mg-0-f pd-b-30 wd-100p">
                        <div className="pos-relative">
                            <img src={ eventBannerURL } 
                                className="card-img-top ht-184 img-fit-cover" 
                                alt="event title" />
                            <div className={` ${!props.pastSession ? '' : 'd-none'} ${i==0 ? 'bg-danger' : 'bg-gray-900'} tx-semibold tx-13 pos-absolute b-10 l-10 pd-y-5 pd-x-10 rounded tx-white`}>
                                <span className="d-inline-block wd-8 ht-8 rounded-50 bg-white mg-r-5"></span> Go live&nbsp;
                                <Moment fromNow>
                                        {startDate}
                                </Moment>

                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title tx-15 tx-semibold">{ title }</h5>
                            <h6 className="card-subtitle mb-3 text-muted tx-13">{ description }</h6>
                            { sessionLink }   
                        </div>
                    </div>
                </div>
    })

    return (
        <div className="row row-xs">
            { items }
        </div>
    )
}

export default SessionCard
