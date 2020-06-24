import React, { useEffect, useState, Fragment } from 'react'
import EventCardView from '../common/EventCardView'
import Search from '../common/Search'
import { Link } from 'react-router-dom'
import StreamingView from '../common/StreamingView'
import API from '../../utils/api'
import AskAQuestion from '../common/AskAQuestion'
import SpeakersList from '../common/SpeakersList'
import StreamingInfo from '../common/StreamingInfo'


const LiveAndUpcoming = (props) => {

    const [stage, setStage] = useState(null)
    const [liveEvent, setLiveEvent] = useState({})
    const [activeEvent, setActiveEvent] = useState(null)
    const [upcomingEvents, setUpcomingEvents] = useState(null)
    const [pastEvents, setPastEvents] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        API.get(`user/jhi-live-events-by-stage?eagerload=true&stage=${props.match.params.stage}`)
            .then(response => {
                let liveEvent = {}
                let upcomingEvents = []
                let pastEvents = []
                const today = new Date();
                response.data[0].events.map((event) => {
                    let eventStartTime = new Date(event.startDate).getTime()
                    let eventDate = new Date(event.startDate)

                    let todayTimeStamp = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
                    let eventTimeStamp = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 0, 0, 0);

                    let { meetingStatus, streamStatus, hlsStreamURL, recordingURL } = {...event.eventBridgeR}
                    if(meetingStatus === 'started' && streamStatus === 'started' && hlsStreamURL) {  // live event
                        if(!Object.keys(liveEvent).length) {
                            liveEvent = event;
                        }
                    }
                    if(todayTimeStamp === eventTimeStamp && today.getTime() < eventStartTime) { // Today's events
                        upcomingEvents.push(event)
                    }
                    if(meetingStatus === 'finished' && streamStatus === 'finished' && recordingURL) { // past events
                        pastEvents.push(event)
                    }
                    
                    return event
                })
                setStage(response.data[0])
                if(Object.keys(liveEvent).length) {
                    setLiveEvent(liveEvent)
                }
                setUpcomingEvents(upcomingEvents)
                setPastEvents(pastEvents)
                // active event can be an session clicked from any page ie., props.location.sessionId, then get the event from data and set the session to activeEvent
                // if no sessionId then check for live event else check for upcoming session else check for past session
                if(props.location.sessionId) {
                    let event = response.data[0].events.filter(event => event.id === props.location.sessionId)
                    setActiveEvent(event[0])
                } else if(Object.keys(liveEvent).length) {
                    setActiveEvent(liveEvent)
                } else if(upcomingEvents && upcomingEvents.length) {
                    setActiveEvent(upcomingEvents[0])
                } else if(pastEvents && pastEvents.length) {
                    setActiveEvent(pastEvents[0])
                }
                
                setIsLoading(false)
            })
            .catch(
                response => {
                    setIsLoading(false)
                    console.log(response)
            });
    }, [props.location.sessionId, props.match.params.stage])

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
                        {
                            !isLoading && Object.keys(liveEvent).length ? 
                                <div className="col-lg-3">
                                    <h6 className="mg-b-10 tx-16 tx-normal">Live Now</h6>
                                    <EventCardView  
                                        events={ [liveEvent] }
                                        setActiveEventHandler = { (id) => setActiveEventHandler(id) }
                                    /> 
                                </div> :
                                null
                        }
                        {
                            !isLoading && upcomingEvents && upcomingEvents.length ? 
                                <div className="col-lg-9">
                                    <div className="row row-xs">
                                        <div className="col-12">
                                            <h6 className="mg-b-10 tx-16 tx-normal">Coming Up Next...</h6>
                                            <div className="row row-xs">
                                                <EventCardView  
                                                    events={ upcomingEvents } 
                                                    setActiveEventHandler = { (id) => setActiveEventHandler(id) }
                                                    colSm={ 6 } colLg={ 4 }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                (
                                    !isLoading && pastEvents && pastEvents.length ?
                                        <div className="col-lg-9">
                                            <div className="row row-xs">
                                                <div className="col-12">
                                                    <h6 className="mg-b-10 tx-16 tx-normal">Previous Sessions...</h6>
                                                    <div className="row row-xs">
                                                        <EventCardView  
                                                            events={ pastEvents } 
                                                            setActiveEventHandler = { (id) => setActiveEventHandler(id) }
                                                            colSm={ 6 } colLg={ 4 }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> :
                                        null
                                )
                        }
                        
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
                                !isLoading && Object.keys(activeEvent).length ?
                                    <Fragment>
                                        {
                                            activeEvent.eventBridgeR && activeEvent.eventBridgeR.meetingStatus === 'finished' &&
                                            activeEvent.eventBridgeR.streamStatus === 'finished' && activeEvent.eventBridgeR.recordingURL ?
                                                <video width="100%" controls className="outline-none">
                                                    <source src={activeEvent.eventBridgeR.recordingURL} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video> :
                                                (
                                                    activeEvent.eventBridgeR && activeEvent.eventBridgeR.meetingStatus === 'started' &&
                                                    activeEvent.eventBridgeR.streamStatus === 'started' && activeEvent.eventBridgeR.hlsStreamURL
                                                    ?
                                                    <StreamingView event={ activeEvent } /> :
                                                    <img alt="live-now" className="w-100 rounded-5 card-img" src={activeEvent.eventBannerURL} />
                                                )
                                        }
                                        <div className="card-body pl-0 pd-t-35">
                                            <h6 className="card-title tx-bold tx-24">{ activeEvent.title }</h6>
                                            <p className="tx-14 tx-color-03 tx-metropolis-semi-bold">
                                                { activeEvent.speakers && activeEvent.speakers.length ? <SpeakersList speakers={ activeEvent.speakers } /> : null }
                                            </p>
                                            <StreamingInfo event={ activeEvent } />
                                        </div>
                                    </Fragment> :
                                    null
                            }
                        </div>
                        <div className="col-lg-4 mg-t-10 mg-lg-t-0 ask-question">
                            <AskAQuestion  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveAndUpcoming
