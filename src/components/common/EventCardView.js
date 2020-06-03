import React, { Fragment, useState, useEffect } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import SpeakersList from './SpeakersList'


const EventCardView = (props) => {

    const [data, setData] = useState(props.events)
    
    const items = data && data.map((event,i) => {
        let { startDate, title, speakers } = { ...event, ...event.speakers }

        return  <div key={event.id} className={`col-sm-${props.colSm} col-md-${props.colMd} col-lg-${props.colLg} col-xl-${props.colXl}`} >
                    <div 
                        className={`ht-112 card card-body mg-b-10 tx-metropolis-semi-bold bg-dark-hover pointer cursor-pointer ${ event.id === props.activeEvent.id ? 'bg-dark' : ''} `}
                        onClick={ () => props.setActiveEventHandler(event.id) }
                    >
                        <small className="lh-normal tx-14 tx-color-03">
                            <Moment format="LT">{ startDate }</Moment>
                        </small>
                        <h6 className="mg-t-4 mg-b-10 tx-16 ht-32 lh-normal">{ title }</h6>
                        <p className="lh-normal tx-12 tx-color-03 mg-b-0">
                            <SpeakersList speakers={ speakers } />
                        </p>
                    </div>
                </div>
    })

    return (
        <Fragment>
            { items.length ? items : 'No Streams today...' }
        </Fragment>
    )
}

export default EventCardView
