import React, { useEffect, useState } from 'react'
import Search from '../common/Search'
import SessionCard from './SessionCard'
import API from '../../utils/api'


const Sessions = (props) => {
    const [data, setData] = useState(null)
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        API.get('user/jhi-events?eagerload=true')
            .then(response => {
                let events = []
                response.data.map((event) => {
                    if(event.status === 'LIVE') {
                        events.push(event)
                    }
                    return event
                })
            
                setData(events)
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
                                    <li className="breadcrumb-item active" aria-current="page">Stage</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row row-xs">
                        <div className="col-12">
                            <h6 className="mg-b-15 tx-18 tx-bold">Upcoming Sessions</h6>
                            { !isLoading ? <SessionCard keycloak={ props.keycloak } data={ data } /> : 'Loading...' }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sessions