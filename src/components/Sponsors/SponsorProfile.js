import React, { useEffect, useState, Fragment } from 'react'
import Search from '../common/Search'
import { Link } from 'react-router-dom'
import API from '../../utils/api'
import SocialLinks from '../common/SocialLinks'
import Attendees from '../common/Attendees'
import Latest from './Lastest'


const SponsorProfile = (props) => {

    let [isProfileLoading, setIsProfileLoading] = useState(true)
    let [data, setData] = useState(null)

    useEffect(() => {
        API.get(`user/jhi-event-sponsors/${props.match.params.id}?eagerload=true`)
            .then(response => {
                setData(response.data)
                setIsProfileLoading(false)
            })
            .catch(response => console.log(response));
    }, [props.match.params.id])

    return (
        <div className="content ht-100v pd-0">
            <Search />
            <div className="content-body">
                <div className="container pd-x-0 tx-13">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item"><Link to={ '/sponsors' }>Sponsors</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{ !isProfileLoading ? data.profile.name : null }</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="media d-block d-lg-flex">
                        {
                            !isProfileLoading ?
                                <div className="profile-sidebar profile-sidebar-two pd-lg-r-15">
                                    <div className="row">
                                        <div className="col-sm-3 col-md-2 col-lg-12">
                                            <div className="avatar-xxl avatar-online pos-relative rounded-circle d-flex bg-white"><img src={ data.profile.companyLogo } className="img-fit-contain rounded-circle img-fluid pd-10" alt={ data.profile.name } /></div>
                                        </div>    
                                        <div className="col-sm-8 col-md-7 col-lg-12 mg-t-20 mg-sm-t-0 mg-lg-t-25">
                                            <h5 className="mg-b-2 tx-spacing--1">{ data.profile.name }</h5>
                                            {data.profile.sponsorType === 'Premiere' || data.profile.sponsorType === 'Silver' ? <p className="tx-color-03 tx-semibold mg-b-5">Premiere Sponsor</p> : null}
                                            <a href={ data.profile.website } target="_blank" className="d-block mg-b-25">{ data.profile.website }</a>
                                            {/* <div className="d-flex mg-b-25">
                                                <button className="btn btn-xs btn-primary flex-fill">Live Chat</button>
                                            </div> */}
                                            <p className="tx-13 tx-color-02 mg-b-25">{ data.profile.about }</p>
                                        </div>    
                                        { data.additional_info && data.additional_info.social_link ? <SocialLinks links={ data.additional_info.social_link } /> : null }
                                    </div>
                                </div> :
                                'Loading...'
                                
                        }
                        <div className="media-body mg-t-40 mg-lg-t-0 pd-lg-x-10">
                            {
                                !isProfileLoading ?
                                    <Latest name={ data.profile.name } id={ data.profile.id } website={ data.profile.website } icon={ data.profile.companyLogo } /> :
                                    'Loading...'
                            }
                        </div>
                        {/* Right */}
                        <div className="profile-sidebar profile-sidebar-two mg-t-40 mg-lg-t-0 pd-lg-l-15">
                            <div className="row">
                                { !isProfileLoading ? <Attendees company={ data.profile.name } /> : null }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SponsorProfile
