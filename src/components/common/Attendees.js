import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../../utils/api'


const Attendees = (props) => {

    let [isLoading, setIsLoading] = useState(true)
    let [data, setData] = useState(null)

    useEffect(() => {
        API.get(`user/event/jhi-event-attendees?eagerload=true&company=${props.company}`)
            .then(response => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }, [props.company])

    const list = !isLoading && data.length && data.map(attendee => {
        let { id, name, profilePicUrl, jobPosition } = {...attendee}
        return <li key={id} className="media align-items-center">
                    <div className="avatar avatar-online"><img src={ profilePicUrl } className="rounded-circle" alt={ name } /></div>
                    <div className="media-body pd-l-15">
                        <Link to={`/lounge/profile/${id}`} className="link-01"><p className="tx-medium mg-b-2">{ name }</p></Link>
                        <span className="tx-12 tx-color-03">{ jobPosition }</span>
                    </div>
                </li>
    })

    return (
        <div className="col-sm-6 col-md-5 col-lg mg-t-40 mg-sm-t-0">
            <div className="d-flex align-items-center justify-content-between mg-b-20">
                <h6 className="tx-13 tx-spacing-1 tx-uppercase tx-semibold mg-b-0">Attendees from <span className="tx-primary ">{ props.company }</span></h6>
            </div>
            <ul className="list-unstyled media-list mg-b-15">
                { !isLoading ? (data.length ? list : 'No Attendees!') : 'Loading...' }
            </ul>
        </div>
    )
}

export default Attendees
