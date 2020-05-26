import React, { Fragment } from 'react'
import StreamingInfo from './StreamingInfo'


const StreamingView = () => {
    return (
        <Fragment>
            <img alt="live-now" className="w-100 rounded-5 card-img" src="/assets/images/watch-now-bg.jpg" />
            <div className="card-body pl-0 pd-t-35">
                <h6 className="card-title tx-bold tx-24">Catalyzing the Benefits of Globalization </h6>
                <p className="tx-14 tx-color-03 tx-metropolis-semi-bold">Kola Adesina and 5 More</p>
                <StreamingInfo />
            </div>
        </Fragment>
    )
}

export default StreamingView
