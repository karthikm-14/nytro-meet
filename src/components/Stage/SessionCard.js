import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'

const SessionCard = (props) => {

    const [userInfo, setUserInfo] = useState({})
	let [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        props.keycloak.loadUserInfo().then((userInfo) => {
            setUserInfo({
                name: userInfo.name, 
                email: userInfo.email, 
                id: userInfo.sub,
				roles: props.keycloak.tokenParsed.realm_access.roles
			})
			setIsLoading(false)
        })
    }, [])
    
    const items = !isLoading && props.data.map(event => {

        let { title, description, eventBannerURL, startDate } = {...event}

        let sessionLink = null 
        if(event.eventBridgeR && event.eventBridgeR.meetingToken) {
            if(userInfo.roles.includes('moderator')) { // this check should be user role for this event
                sessionLink = <a href={`https://meet.nytro.ai/nytro_event/start_meeting.php?user_name=${userInfo.name}&user_email=${userInfo.email}&meeting_token=${event.eventBridgeR.meetingToken}`} target="_blank" className="pos-absolute b-20 ">
                    <button className="btn btn-sm pd-x-15 btn-primary tx-12 tx-bold">
                        START SESSION
                    </button>
                </a> 
            } else if (userInfo.roles.includes('panelist')) {
                sessionLink = <a href={`https://meet.nytro.ai/nytro_event/join_meeting.php?user_name=${userInfo.name}&user_email=${userInfo.email}&meeting_token=${event.eventBridgeR.meetingToken}`} target="_blank" className="pos-absolute b-20 ">
                    <button className="btn btn-sm pd-x-15 btn-primary tx-12 tx-bold">
                        JOIN SESSION
                    </button>
                </a> 
            }
        }

        return <div key={event.id} className="d-flex col-md-4 mg-b-10 wd-100p">
                    <div className="card mg-0-f pd-b-30 wd-100p">
                        <img src={ eventBannerURL } 
                            className="card-img-top ht-184 img-fit-cover" 
                            alt="event title" />
                        <div className="card-body">
                            <Moment fromNow>{startDate}</Moment>
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
