import React, { useState, useEffect } from 'react'
// import WatchNow from '../common/WatchNow'
import EventCardView from '../common/EventCardView'
import SlickCarousel from '../common/SlickCarousel'
import LiveNowCarousel from "../common/LiveNowCarousel";
import Search from '../common/Search'

import API from "../../utils/api";
import { Link, Redirect } from 'react-router-dom'


const Home = () => {

    const [data, setData] = useState(null)
    const [todaySessions, setTodaySessions] = useState([])
    const [doneEvents, setDoneEvents] = useState([])
    const [liveEvents, setLiveEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [header, setHeader] = useState(null)

    useEffect(() => {
        API.get('user/jhi-events?eagerload=true')
            .then(response => {
                let doneEvents = []
                let todaySessions = []
                let liveEvents = []
                const today = new Date();
                response.data.map((event) => {

                    let eventStartTime = new Date(event.startDate).getTime()
                    let eventDate = new Date(event.startDate)

                    let todayTimeStamp = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
                    let eventTimeStamp = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 0, 0, 0);


                    let { meetingStatus, streamStatus, hlsStreamURL, recordingURL } = {...event.eventBridgeR}
                    
                    // updated liveEvent with LIVE event if exists
                    if(meetingStatus === 'started' && streamStatus === 'started' && hlsStreamURL) {
                        liveEvents.push(event);
                    } 
                    if(meetingStatus === 'finished' && streamStatus === 'finished' && recordingURL) {
                        doneEvents.push(event)
                    // } else if(todayTimeStamp === eventTimeStamp && eventStartTime >= Date.now()) { 
                    }  
                    if(todayTimeStamp === eventTimeStamp && today.getTime() < eventStartTime) { // Today's events
                        // event whic are scheduled for today and from current time
                        todaySessions.push(event)
                        // if(!Object.keys(liveEvent).length) {
                        //     liveEvent = event;
                        // }
                    }
                    return event
                })
                setTodaySessions(todaySessions)
                setDoneEvents(doneEvents)
                setLiveEvents(liveEvents.length ? liveEvents : (todaySessions.length ? [todaySessions[0]] : [doneEvents[0]]))
                if(liveEvents.length) {
                    setHeader('Live Now')
                } else if (todaySessions.length) {
                    setHeader('Upcoming Session')
                } else {
                    setHeader('Past Session')
                }
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }, [])

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
                        <div className="col-lg-9 live-now-section">
                            <h6 className="mg-b-10 tx-16 tx-normal">
                                { header }
                            </h6>
                            { !isLoading ? 
                                <LiveNowCarousel events={ liveEvents } /> :  
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
                                                events={ todaySessions.slice(0,4) }
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
                            <SlickCarousel sessions={ doneEvents } />
                        </div> :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
