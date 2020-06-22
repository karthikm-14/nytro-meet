import React, { useEffect, useState, Fragment } from 'react'
import EventCardView from '../common/EventCardView'
import Search from '../common/Search'
import { Link } from 'react-router-dom'
import StreamingView from '../common/StreamingView'
import API from '../../utils/api'


const LiveAndUpcoming = (props) => {

    const [stage, setStage] = useState(null)
    const [liveEvent, setLiveEvent] = useState(null)
    const [activeEvent, setActiveEvent] = useState(null)
    const [draftEvents, setDraftEvents] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        API.get(`user/jhi-live-events-by-stage?eagerload=true&stage=${props.match.params.stage}`)
            .then(response => {
                let liveEvent = {}
                let draftEvents = []
                const today = new Date();
                response.data[0].events.map((event) => {
                    let eventStartTime = new Date(event.startDate).getTime()
                    let eventDate = new Date(event.startDate)

                    let todayTimeStamp = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
                    let eventTimeStamp = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 0, 0, 0);

                    let { meetingStatus, streamStatus, hlsStreamURL } = {...event.eventBridgeR}
                    if(meetingStatus === 'live_stream' && streamStatus === 'started' && hlsStreamURL) { 
                        if(!Object.keys(liveEvent).length) {
                            liveEvent = event;
                        }
                    } else if(todayTimeStamp === eventTimeStamp) { // Today's events
                        draftEvents.push(event)
                    }
                    
                    return event
                })
                setStage(response.data[0])
                setLiveEvent(liveEvent)
                setDraftEvents(draftEvents)
                setActiveEvent(Object.keys(liveEvent).length ? liveEvent : draftEvents[0])
                setIsLoading(false)
            })
            .catch(
                response => {
                    setIsLoading(false)
                    console.log(response)
            });
    }, [props.match.params.stage])

    const setActiveEventHandler = (id) => {
        let activeEvent = stage.events.filter(event => event.id === id);
        setActiveEvent({...activeEvent[0]})
    }

    return (
        <div className="content ht-100v pd-0">
            <Search />
            <div className="content-body">
                <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item"><Link to={ '/live-now' }>live now</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{ props.match.params.stage }</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row row-xs">
                        <div className="col-lg-3">
                            <h6 className="mg-b-10 tx-16 tx-normal">Live Now</h6>
                            {
                                !isLoading && Object.keys(liveEvent).length ? 
                                            <EventCardView  
                                                activeEvent={ activeEvent } 
                                                events={ [liveEvent] } 
                                                setActiveEventHandler = { (id) => setActiveEventHandler(id) }
                                            /> : null
                            }
                        </div>
                        <div className="col-lg-9">
                            <div className="row row-xs">
                                <div className="col-12">
                                    <h6 className="mg-b-10 tx-16 tx-normal">Coming Up Next...</h6>
                                    <div className="row row-xs">
                                        {
                                            !isLoading && draftEvents && draftEvents.length ? 
                                                <EventCardView  
                                                    activeEvent={ activeEvent ? activeEvent : null } 
                                                    events={ draftEvents } 
                                                    setActiveEventHandler = { (id) => setActiveEventHandler(id) }
                                                    colSm={ 6 } colLg={ 4 }
                                                /> : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            isLoading ?
                                <Fragment>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <div className="bg-gray-400 rounded pos-relative ht-120">
                                            <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                                <div className="line"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <div className="bg-gray-400 rounded pos-relative ht-120">
                                            <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                                <div className="line"></div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment> : null
                        }
                    </div>
                    <div className="row row-xs mg-t-20">
                        <div className="col-lg-8">
                            {
                                !isLoading && Object.keys(liveEvent).length ?
                                    <StreamingView event={ activeEvent } /> :
                                    null
                            }
                        </div>
                        <div className="col-lg-4 mg-t-10 mg-lg-t-0">
                            <div className="row row-xs">
                                <div className="col-12">
                                    <div className="row row-xs">
                                        {/* <EventCardView itemsCount={ 4 } colSm={ 6 } colLg={ 12 } /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveAndUpcoming
