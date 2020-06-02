import React, { Fragment } from 'react'


const DateCardView = (props) => {

    const formateDate = (n) => {
        let formatedDate = new Date(n).toLocaleDateString('en-US', {  
            month : 'long',
            day : 'numeric',
            year : 'numeric'
        })
        return formatedDate
    }

    const items = props.data.map((schedule,i) => {
            return <div key={i} className={`col-sm-${props.colSm} col-md-${props.colMd} col-lg-${props.colLg} col-xl-${props.colXl}`}>
                        <div 
                            className={`bg-dark-hover cursor-pointer card card-body mg-b-10 tx-metropolis-semi-bold ${schedule.date === props.activeDate ? 'bg-dark' : ''} `}
                            onClick={ () => props.getStages(schedule.date) }
                        >
                            <h6 className={`lh-normal text-uppercase ${i===0 ? 'text-white' : 'tx-color-03'}`}>{ schedule.day }</h6>
                            <h4 className={`tx-24 ${schedule.date === props.activeDate ? 'text-primary' : ''}`}>{ formateDate(schedule.date) }</h4>
                            <p className={`lh-normal mg-b-0 ${i===0 ? 'text-white' : 'tx-color-03'}`}>{ schedule.totalEvents } Events</p>
                        </div>
                    </div>
    })

    return (
        <Fragment>
            { props.data.length ? items : 'No Schedules' }
        </Fragment>
    )
}

export default DateCardView
