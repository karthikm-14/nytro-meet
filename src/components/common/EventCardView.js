import React, { Fragment } from 'react'


const EventCardView = (props) => {

    const items = []

    for (let i=0;i<props.itemsCount;i++) {
        items.push(
            <div key={i} className={`col-sm-${props.colSm} col-md-${props.colMd} col-lg-${props.colLg} col-xl-${props.colXl}`}>
                <div className={`card card-body mg-b-10 tx-metropolis-semi-bold ${i===0 ? 'bg-dark' : ''} `}>
                    <small className="lh-normal tx-14 tx-color-03">11:30 AM PST</small>
                    <h6 className="mg-t-4 mg-b-10 tx-16 ht-32 lh-normal">Where are we? Where are we headed to?</h6>
                    <p className="lh-normal tx-12 tx-color-03 mg-b-0">Kola Adesina and 5 More</p>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            { items }
        </Fragment>
    )
}

export default EventCardView
