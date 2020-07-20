import React, { useEffect, useState } from 'react'
import Search from '../common/Search'
import SessionCard from './SessionCard'
import API from '../../utils/api'
import PanelistJoinPage from './PanelistJoinPage'


const Sessions = (props) => {
    const [upcomingSessions, setUpcomingSessions] = useState(null)
    let [isLoading, setIsLoading] = useState(true)
    let [isPanelistJoinPage, setIsPanelistJoinPage] = useState(false)
    let [joinSessionDetails, setJoinSessionDetails] = useState(null)

    useEffect(() => {
        if(!isPanelistJoinPage) {
            setJoinSessionDetails(null)
        }
        API.get('user/jhi-events?eagerload=true')
            .then(response => {
                let upcomingSessions = []
                const today = new Date();
                response.data.map((event) => {

                    let todayTimeStamp = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

                    let eventDate = new Date(event.startDate)
                    let eventStartTime = new Date(event.startDate).getTime()
                    let eventTimeStamp = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 0, 0, 0);


                    if(todayTimeStamp === eventTimeStamp) {
                        upcomingSessions.push(event)
                    }
                    return event
                })
            
                setUpcomingSessions(upcomingSessions)
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }, [isPanelistJoinPage])

    const getJoinSessionDetails = (event, userInfo) => {
        setJoinSessionDetails({
            title: event.title,
            date: event.startDate,
            meetingToken: event.eventBridgeR.meetingToken,
            bridgeId: event.eventBridgeR.id,
            ...userInfo
        })
        setIsPanelistJoinPage(true)
    }

    return (
        <div className="content ht-100v pd-0">
            <div className="content-body">
                {
                    !isPanelistJoinPage ?
                        <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                            <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                                <div>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                            <li className="breadcrumb-item active" aria-current="page">Stage</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="row row-xs">
                                <div className="col-12">
                                    <h6 className="mg-b-15 tx-18 tx-bold">Upcoming Sessions</h6>
                                    { 
                                        !isLoading ? 
                                            <SessionCard getJoinSessionDetails={ getJoinSessionDetails } keycloak={ props.keycloak } data={ upcomingSessions } /> :
                                            null 
                                    }
                                </div>
                            </div>
                        </div> :
                        null
                }
                {
                    isPanelistJoinPage ?
                        <PanelistJoinPage setIsPanelistJoinPage={ setIsPanelistJoinPage } joinSessionDetails={ joinSessionDetails } /> :
                        null
                }
            </div>
        </div>
    )
}

export default Sessions
