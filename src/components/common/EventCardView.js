import React, { Fragment, useState, useEffect } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import SpeakersList from './SpeakersList'
import { Link } from 'react-router-dom';


const EventCardView = (props) => {
    const [data, setData] = useState(props.events)
    const items = data && data.map((event,i) => {
        let { startDate, title, speakers } = { ...event, ...event.speakers }
        
        return  <div key={event.id} className={`col-sm-${props.colSm} col-md-${props.colMd} col-lg-${props.colLg} col-xl-${props.colXl}`} >
                    
                    {
                        props.setActiveEventHandler ?
                        <div
                            className={`ht-112 card card-body mg-b-10 tx-metropolis-semi-bold bg-dark-hover pointer cursor-pointer `}
                            onClick={ () => props.setActiveEventHandler(event.id, ) }
                        >
                            <small className="lh-normal tx-14 tx-color-03">
                                <Moment format="LT">{ startDate }</Moment>
                            </small>
                            <h6 className="mg-t-4 mg-b-10 tx-16 ht-32 lh-normal overflow-hidden" title={ title }>{ title }</h6>
                            <p className="lh-normal tx-12 tx-color-03 mg-b-0">
                                { speakers && speakers.length ? <SpeakersList speakers={ speakers } /> : null }
                            </p>
                        </div> :
                        <Link
                            to={{pathname: `/live-now/${event.stage.title}`, sessionId: event.id}}
                            className={`ht-112 card card-body mg-b-10 tx-metropolis-semi-bold bg-dark-hover pointer cursor-pointer `}
                        >
                            <small className="lh-normal tx-14 tx-color-03">
                                <Moment format="LT">{ startDate }</Moment>
                            </small>
                            <h6 className="mg-t-4 mg-b-10 tx-16 ht-32 lh-normal overflow-hidden" title={ title }>{ title }</h6>
                            <p className="lh-normal tx-12 tx-color-03 mg-b-0">
                                { speakers && speakers.length ? <SpeakersList speakers={ speakers } /> : null }
                            </p>
                        </Link>
                    }
                </div>
    })

    return (
        <Fragment>
            { items.length ? items : <div className="col-xs">No Sessions today.</div> }
        </Fragment>
    )
}

export default EventCardView
