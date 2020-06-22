import React, { useEffect, useState, Fragment } from 'react'
import Search from '../common/Search'
import { Link } from 'react-router-dom'
import API from '../../utils/api'
import SocialLinks from './SocialLinks'
import Attendees from '../common/Attendees'


const SponsorProfile = (props) => {

    let [isProfileLoading, setIsProfileLoading] = useState(true)
    let [profile, setProfile] = useState(null)

    useEffect(() => {
        API.get(`user/jhi-event-sponsors/${props.match.params.id}?eagerload=true`)
            .then(response => {
                setProfile(response.data)
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
                                    <li className="breadcrumb-item active" aria-current="page">{ !isProfileLoading ? profile.name : null }</li>
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
                                            <div className="avatar-xxl avatar-online pos-relative rounded-circle d-flex bg-white"><img src={ profile.companyLogo } className="img-fit-contain rounded-circle img-fluid pd-10" alt={ profile.name } /></div>
                                        </div>    
                                        <div className="col-sm-8 col-md-7 col-lg-12 mg-t-20 mg-sm-t-0 mg-lg-t-25">
                                            <h5 className="mg-b-2 tx-spacing--1">{ profile.name }</h5>
                                            {profile.sponsorType === 'Premiere' || profile.sponsorType === 'Silver' ? <p className="tx-color-03 tx-semibold mg-b-5">Premiere Sponsor</p> : null}
                                            <a href={ profile.website } target="_blank" className="d-block mg-b-25">{ profile.website }</a>
                                            {/* <div className="d-flex mg-b-25">
                                                <button className="btn btn-xs btn-primary flex-fill">Live Chat</button>
                                            </div> */}
                                            <p className="tx-13 tx-color-02 mg-b-25">{ profile.about }</p>
                                        </div>    
                                        { profile.sponsorAddInfos && profile.sponsorAddInfos.length ? <SocialLinks links={ profile.sponsorAddInfos } /> : null }
                                    </div>
                                </div> :
                                'Loading...'
                                
                        }
                        {
                            !isProfileLoading ?
                                <div className="media-body mg-t-40 mg-lg-t-0 pd-lg-x-10">
                                    <div className="card mg-b-20 mg-lg-b-25">
                                        <div className="card-header pd-y-15 pd-x-20 d-flex align-items-center justify-content-between">
                                            <h6 className="tx-13 tx-spacing-1 tx-uppercase tx-semibold mg-b-0">Latest Activity</h6>
                                        </div>
                                        <div className="card-body pd-20 pd-lg-25">
                                            <div className="media align-items-center mg-b-20">
                                                <div className="avatar avatar-online"><img src="https://via.placeholder.com/500" className="rounded-circle" alt="" /></div>
                                                <div className="media-body pd-l-15">
                                                    <h6 className="mg-b-3">Regalix Inc.</h6>
                                                    <span className="d-block tx-13 tx-color-03">www.regalix.com</span>
                                                </div>
                                                <span className="d-none d-sm-block tx-12 tx-color-03 align-self-start">5 hours ago</span>
                                            </div>
                                            <p className="mg-b-20">Our team is expanding again. We are looking for a Product Manager and Software Engineer to drive our new aspects of our capital projects. If you're interested, please drop a comment here or simply message me. <a href="">#softwareengineer</a> <a href="">#engineering</a></p>
                                        </div>
                                    </div>
                                </div> : 
                                'Loading...'
                        }
                        {/* Right */}
                        <div className="profile-sidebar profile-sidebar-two mg-t-40 mg-lg-t-0 pd-lg-l-15">
                            <div className="row">
                                { !isProfileLoading ? <Attendees company={ profile.name } /> : null }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SponsorProfile
