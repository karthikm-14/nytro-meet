import React, { Fragment, useEffect, useState } from 'react'
import ProfileFilters from './ProfileFilters'
import API from '../../utils/api'
import { Link } from 'react-router-dom'


const Profiles = () => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filterByCompanyName, setFilterByCompanyName] = useState(null)
    const [filterByPositionName, setFilterByPositionName] = useState(null)

    useEffect(() => {

        setIsLoading(true)
        let filterAttendeeBy = ''; 
        if(filterByCompanyName) {
            filterAttendeeBy = `${filterAttendeeBy}&company=${filterByCompanyName}`
        }
        if(filterByPositionName) {
            filterAttendeeBy = `${filterAttendeeBy}&jobPosition=${filterByPositionName}`
        }
        API.get(
            `user/event/jhi-event-attendees?eagerload=true${filterAttendeeBy}`)
            .then(response => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch(response => console.log(response));

    }, [filterByCompanyName, filterByPositionName])

    const items = !isLoading && data.length ? data.map(attendee => {
        let { id, profilePicUrl, name, jobPosition, companyName } = {...attendee}
        return <div key={id} className="col-sm-4 col-md-3 col-lg-4 col-xl-3 d-flex">            
                    <div className="card card-profile mg-b-10 wd-100p">
                        {/* <img src="https://via.placeholder.com/500" className="card-img-top" alt="" /> */}
                        <div className="ht-100 card-img-top bg-gray-100"></div>
                        <div className="card-body tx-13">
                            <div>
                                <Link to={`lounge/profile/${attendee.id}`}>
                                    <div className="avatar avatar-lg"><img src={profilePicUrl ? profilePicUrl : "https://via.placeholder.com/350"} className="rounded-circle" alt="" /></div>
                                </Link>
                                <Link to={`lounge/profile/${attendee.id}`} className="tx-white text-center">
                                    <h4 className="mg-t-10 tx-14">{ name }</h4>
                                </Link>
                                <h6 className="tx-11 mg-b-5 tx-gray-500 tx-nowrap">{ jobPosition }</h6>
                                <small className="tx-12 text-primary mg-b-10 text-center">{ companyName }</small>
                                <p></p>
                            </div>
                        </div>
                    </div>                
                </div>
    }) : 'No attendees'

    let filtersList =   <div className="d-flex mg-b-20">
                            { filterByCompanyName ? 
                                <div className="bg-dark rounded pd-2 pd-r-5 mg-r-10">
                                    <i onClick={ () => setFilterByCompanyName(null) } className="icon ion-md-close-circle pd-5 cursor-pointer tx-16"></i> <span>{ filterByCompanyName }</span>
                                </div> :
                                null
                            }
                            { filterByPositionName ? 
                                <div className="bg-dark rounded pd-2 pd-r-5">
                                    <i  onClick={ () => setFilterByPositionName(null) }  className="icon ion-md-close-circle pd-5 cursor-pointer tx-16"></i> <span>{ filterByPositionName }</span>
                                </div> :
                                null
                            }
                        </div>

    return (
        <Fragment>
            { filtersList }
            <h6 className="mg-b-15 tx-18 tx-bold">Attendees <span className="tx-gray-500 tx-16 tx-normal">( { !isLoading ? data.length : null } )</span></h6>
            <div className="row row-xs mg-b-25 profile-list">
                <div className="col-lg-9 col-xl-9 mg-t-40 mg-lg-t-0">    
                    <div className="row row-xs">
                        { !isLoading ? items : 'Loading...' }
                    </div>
                </div>
                <div className="col-lg-4 col-xl-3 mg-t-40 mg-lg-t-0">
                    <ProfileFilters 
                        filterByCompanyName = { filterByCompanyName }
                        setFilterByCompanyName = { (name) => setFilterByCompanyName(name) }
                        filterByPositionName = { filterByPositionName }
                        setFilterByPositionName = { (name) => setFilterByPositionName(name) }
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Profiles
