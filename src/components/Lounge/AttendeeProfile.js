import React, { useEffect, useState } from 'react'
import Search from '../common/Search'
import { Link } from 'react-router-dom'
import API from '../../utils/api'
import Attendees from '../common/Attendees'
import LatestActivity from './LatestActivity'
import SocialLinks from '../common/SocialLinks'


const AttendeeProfile = (props) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        API.get(`user/event/jhi-event-attendee-details/${props.match.params.id}`)
            .then(response => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }, [props.match.params.id])

    let content = !isLoading && <div className="media d-block d-lg-flex">
                    {/* Left */}
                    <div className="profile-sidebar profile-sidebar-two pd-lg-r-15">
                        <div className="row">
                            <div className="col-sm-3 col-md-2 col-lg-12">
                                <div className="avatar avatar-xxl avatar-online">
                                    <img src={ data.profile.profilePicUrl ? data.profile.profilePicUrl : 'https://via.placeholder.com/500' } className="rounded-circle" alt="" />
                                </div>
                            </div>    
                            <div className="col-sm-8 col-md-7 col-lg-12 mg-t-20 mg-sm-t-0 mg-lg-t-25">
                                <h5 className="mg-b-2 tx-spacing--1">{ data.profile.name }</h5>
                                <p className="tx-color-03 tx-semibold mg-b-5">{ data.profile.jobPosition }</p>
                                <a href={ data.profile.companyWebsite } target="_blank" rel="noopener noreferrer" className="d-block mg-b-25">{ data.profile.companyName }</a>
                                {/* <div className="d-flex mg-b-25">
                                    <button className="btn btn-xs btn-primary flex-fill">Live Chat</button>
                                </div> */}
                                { data.additional_info.about ? <p className="tx-13 tx-color-02 mg-b-25">{ data.additional_info.about[0].keyValue }</p> : null }
                            </div>
                            { data.additional_info && data.additional_info.social_link ? <SocialLinks links={ data.additional_info.social_link } /> : null } 
                        </div>
                    </div>
                    {/* Center */}
                    <div className="media-body mg-t-40 mg-lg-t-0 pd-lg-x-10">
                        <LatestActivity name={ data.profile.name } email={ data.profile.email } position={ data.profile.jobPosition } icon={ data.profile.profilePicUrl } />
                    </div>
                    {/* Right */}
                    <div className="profile-sidebar profile-sidebar-two mg-t-40 mg-lg-t-0 pd-lg-l-15">
                        <div className="row">
                            { !isLoading ? <Attendees company={ data.profile.companyName } /> : null }
                        </div>
                    </div>
                </div>

    return (
        <div className="content ht-100v pd-0">
            <Search />
            <div className="content-body">
                <div className="container pd-x-0 tx-13">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item"><Link to={ '/lounge' }>Lounge</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{ !isLoading ? data.profile.name : null }</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    { !isLoading ? content : 'Loading...' }
                </div>
            </div>
        </div>
    )
}

export default AttendeeProfile
