import React, { useState, useEffect } from 'react'
import WatchNow from '../common/WatchNow'
import EventCardView from '../common/EventCardView'
import SlickCarousel from '../common/SlickCarousel'
import Search from '../common/Search'

import API from "../../utils/api";
import { Link } from 'react-router-dom'


const Home = () => {

    const [data, setData] = useState(null)
    const [todayEvents, setTodayEvents] = useState([])
    const [doneEvents, setDoneEvents] = useState([])
    const [activeEvent, setActiveEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        API.get('user/jhi-events?eagerload=true')
            .then(response => {
                let doneEvents = []
                let todayEvents = []
                let activeEvent = {}
                const today = new Date();
                response.data.map((event) => {

                    let eventStartTime = new Date(event.startDate).getTime()
                    let eventDate = new Date(event.startDate)

                    let todayTimeStamp = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
                    let eventTimeStamp = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 0, 0, 0);


                    let { meetingStatus, streamStatus, hlsStreamURL, recordingURL } = {...event.eventBridgeR}
                    if(meetingStatus === 'finished' && streamStatus === 'finished' && recordingURL) {
                        doneEvents.push(event)
                    // } else if(todayTimeStamp === eventTimeStamp && eventStartTime >= Date.now()) { 
                    } else if(todayTimeStamp === eventTimeStamp) { // Today's events
                        // event whic are scheduled for today and from current time
                        todayEvents.push(event)
                        // if(!Object.keys(activeEvent).length) {
                        //     activeEvent = event;
                        // }
                    } 
                    // updated activeEvent with LIVE event if exists
                    if(meetingStatus === 'live_stream' && streamStatus === 'started' && hlsStreamURL) {
                        activeEvent = event;
                    }
                    return event
                })
                setTodayEvents(todayEvents)
                setDoneEvents(doneEvents)
                setActiveEvent(activeEvent)
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }, [])

    const setActiveEventHandler = (id) => {
        let activeEvent = todayEvents.filter(event => event.id === id);
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
                                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row row-xs">
                        <div className="col-lg-9">
                            <h6 className="mg-b-10 tx-16 tx-normal">Live Now</h6>
                            { !isLoading ? 
                                <WatchNow event={ activeEvent } /> :  
                                <div className="live-now-wrapper bg-gray-400 col-xs-6 rounded pos-relative">
                                    <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                        <div className="line"></div>
                                        <div className="line"></div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="col-lg-3 mg-t-10 mg-lg-t-0">
                            <div className="row row-xs">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mg-b-10 tx-16 tx-normal">Today</h6>
                                        <Link to={ '/schedule' }>See All</Link>
                                    </div>
                                    <div className="row row-xs">
                                        { !isLoading ? 
                                            <EventCardView 
                                                events={ todayEvents.slice(0,4) }
                                                activeEvent = { activeEvent }
                                                setActiveEventHandler = { (id) => setActiveEventHandler(id) }
                                                colSm={ 6 } colLg={ 12 } 
                                            /> : 
                                            <div className="col-12">
                                                <div className="ht-120 bg-gray-400 col-xs-6 rounded pos-relative mg-b-10">
                                                    <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                                        <div className="line"></div>
                                                    </div>
                                                </div>
                                                <div className="ht-120 bg-gray-400 col-xs-6 rounded pos-relative mg-b-10">
                                                    <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                                        <div className="line"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    { !isLoading && doneEvents.length ?
                        <div id="slider-content" className="mg-t-50">
                            <h6 className="mg-b-10 tx-16 tx-normal">In Case You Missed it...</h6>
                            <SlickCarousel events={ doneEvents } />
                        </div> :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
