import React, { Fragment, useEffect, useState } from 'react'
import SpeakersFilters from './SpeakersFilters'
import API from '../../utils/api'
import { Link } from 'react-router-dom'
import SpeakerCardView from '../common/SpeakerCardView'


const Speakers = () => {

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
            `user/jhi-event-speakers?eagerload=true${filterAttendeeBy}`)
            .then(response => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch(response => console.log(response));

    }, [filterByCompanyName, filterByPositionName])

    const items = !isLoading && data.length ? data.map(attendee => {
        return <SpeakerCardView key={attendee.id} speaker={ attendee } />
    }) : 'No Speakers'

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
            <h6 className="mg-b-15 tx-18 tx-bold">Profiles <span className="tx-gray-500 tx-16 tx-normal">( { !isLoading ? data.length : null } )</span></h6>
            <div className="row row-xs mg-b-25 profile-list">
                <div className="col-lg-9 col-xl-9 mg-t-40 mg-lg-t-0">    
                    <div className="row row-xs">
                        { !isLoading ? items : 'Loading...' }
                    </div>
                </div>
                <div className="col-lg-4 col-xl-3 mg-t-40 mg-lg-t-0">
                    <SpeakersFilters 
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

export default Speakers
