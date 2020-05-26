import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const DateCardView = (props) => {

    const items = []

    for (let i=0;i<props.itemsCount;i++) {
        items.push(
            <div key={i} className={`col-sm-${props.colSm} col-md-${props.colMd} col-lg-${props.colLg} col-xl-${props.colXl}`}>
                <Link to={"#"}>
                    <div className={`card card-body mg-b-10 tx-metropolis-semi-bold ${i===0 ? 'bg-dark' : ''} `}>
                        <h6 className={`lh-normal text-uppercase ${i===0 ? 'text-white' : 'tx-color-03'}`}>monday</h6>
                        <h4 className={`tx-24 ${i===0 ? 'text-primary' : ''}`}>June 23, 2020</h4>
                        <p className={`lh-normal mg-b-0 ${i===0 ? 'text-white' : 'tx-color-03'}`}>19 Events</p>
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <Fragment>
            { items }
        </Fragment>
    )
}

export default DateCardView
