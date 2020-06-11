import React, { Fragment, useEffect, useState } from 'react'
import ProfileFilters from './ProfileFilters'
import API from '../../utils/api'


const Profiles = () => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAttendeesData()
    }, [])

    const getAttendeesData = (filter) => {
        API.get(`user/event/jhi-event-attendees?eagerload=true${filter && Object.keys(filter) ? `?${filter.by}=${filter.text}` : ''}`)
            .then(response => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }

    const items = !isLoading && data.length ? data.map(attendee => {
        let { id, profilePicUrl, name, jobPosition, companyName } = {...attendee}
        return <div key={id} className="col-sm-4 col-md-3 col-lg-4 col-xl-3">            
                    <div className="card card-profile mg-b-10">
                        <img src="https://via.placeholder.com/500" className="card-img-top" alt="" />
                        <div className="card-body tx-13">
                            <div>
                                <a href="">
                                    <div className="avatar avatar-lg"><img src={profilePicUrl ? profilePicUrl : "https://via.placeholder.com/350"} className="rounded-circle" alt="" /></div>
                                </a>
                                <h4 className="mg-t-10 tx-14"><a href="" className="tx-white">{ name }</a></h4>
                                <h6 className="tx-11 mg-b-5 tx-gray-500 tx-nowrap">{ jobPosition }</h6>
                                <small className="tx-12 text-primary mg-b-10">{ companyName }</small>
                                <div className="d-flex justify-content-between">    
                                    <button className="btn btn-dark tx-gray-500 pd-x-12 tx-14 pd-0">
                                        <i data-feather="message-square" className="tx-14"></i>
                                    </button>
                                    <button className="btn btn-block btn-primary tx-semibold mg-l-10">Add Contact</button>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
    }) : 'No attendees'

    return (
        <Fragment>
            <h6 className="mg-b-15 tx-18 tx-bold">Attendees <span className="tx-gray-500 tx-16 tx-normal">( { !isLoading ? data.length : null } )</span></h6>
            <div className="row row-xs mg-b-25 profile-list">
                <div className="col-lg-9 col-xl-9 mg-t-40 mg-lg-t-0">    
                    <div className="row row-xs">
                        { !isLoading ? items : 'Loading...' }
                    </div>
                </div>
                <div className="col-lg-4 col-xl-3 mg-t-40 mg-lg-t-0">
                    <ProfileFilters getAttendeesData={ (filter) => getAttendeesData(filter) } />
                </div>
            </div>
        </Fragment>
    )
}

export default Profiles
