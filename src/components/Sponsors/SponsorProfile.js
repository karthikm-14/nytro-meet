import React, { useEffect, useState, Fragment } from 'react'
import Search from '../common/Search'
import { Link } from 'react-router-dom'
import API from '../../utils/api'
import SocialLinks from '../common/SocialLinks'
import Attendees from '../common/Attendees'
import Latest from './Lastest'
// import SharePost from '../common/post/SharePost'


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
            <div className="content-body pd-0">
                <div className="container pd-x-0 pd-t-25 tx-13">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-0">
                                    <li className="breadcrumb-item"><Link to={ '/sponsors' }>Sponsors</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{ !isProfileLoading ? data.profile.name : null }</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                { 
                    !isProfileLoading ? 
                        (   
                            data.profile.companyBanner ?
                                <div className="sponsor-banner position-relative overflow-hidden">
                                    <img alt="banner" className="ht-200 wd-100p blur-15" src={ data.profile.companyBanner } />
                                    <img alt="banner" className="ht-200 position-absolute l-0 r-0 mg-r-auto mg-l-auto" src={ data.profile.companyBanner } />
                                </div> : 
                                null 
                        ) :
                        null
                }
                <div className="container pd-x-0 pd-t-30 tx-13">
                    { !isProfileLoading ? 
                        <div className="media d-block d-lg-flex">
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
                            </div>
                            <div className="media-body mg-t-40 mg-lg-t-0 pd-lg-x-10">
                                {/* <SharePost /> */}
                                <Latest name={ data.profile.name } id={ data.profile.id } website={ data.profile.website } icon={ data.profile.companyLogo } />
                            </div>
                            {/* Right */}
                            <div className="profile-sidebar profile-sidebar-two mg-t-40 mg-lg-t-0 pd-lg-l-15">
                                <div className="row">
                                    <Attendees company={ data.profile.name } />
                                </div>
                            </div>
                        </div> :
                        'Loading...'
                    }
                </div>
            </div>
        </div>
    )
}

export default SponsorProfile
