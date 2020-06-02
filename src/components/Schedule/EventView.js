import React from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import SpeakersList from '../common/SpeakersList'


const EventView = (props) => {

    const items = props.events.map(event => {
        return <div className="pd-20" key={event.id}>
                    <div className="media align-items-center">
                        <div className="wd-70 ht-70 d-flex align-items-center mg-r-10">
                            <img src={ event.eventBannerURL ? event.eventBannerURL : 'https://via.placeholder.com/68' } className="img-fluid rounded" alt="" />
                        </div>
                        <div className={`media-body lh-normal ${event.status==='DONE' ? 'event-expired': ''}`}>
                            <h5 className="tx-13 lh-2">
                                { event.title }
                                { event.status === 'LIVE' ? <span className="event-live d-inline-block wd-3 ht-3 rounded mg-l-8"></span> : null }
                            </h5>
                            <p className="tx-12 mg-b-2 tx-semibold">
                                <Moment format="LT">{ event.startDate }</Moment> - <Moment format="LT">{ event.endDate }</Moment>
                            </p>
                            <small className="tx-10 text-primary tx-semibold">
                                <SpeakersList speakers={ event.speakers } />
                            </small>
                        </div>
                        <div className="dropdown dropleft tx-24">
                            <summary className="link-03 lh-0 mg-l-10" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="icon ion-md-more"></i></summary>
                            <div className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
                                <li className="nav-item">
                                    <a href="#" className="nav-link d-flex align-items-center tx-gray-500 pd-5 tx-10 tx-semibold">
                                        <i className="icon ion-md-alarm mg-r-10 tx-16"></i><span>Set Reminder</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link d-flex align-items-center tx-gray-500 pd-5 tx-10 tx-semibold">
                                        <i data-feather="mail" className="mg-r-10 ht-15 wd-15"></i> <span>Contact Speaker</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link d-flex align-items-center tx-gray-500 pd-5 tx-10 tx-semibold">
                                        <i data-feather="copy" className="mg-r-10 ht-15 wd-15"></i> <span>Save Attachments</span>
                                    </a>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
    })

    return (
        items 
    )
}

export default EventView
