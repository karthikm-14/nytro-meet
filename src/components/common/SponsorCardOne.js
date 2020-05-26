import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const SponsorCardOne = () => {

    const items = []

    for(let i=0;i<2;i++) {
        items.push(
            <div key={i} className="col-lg-6 mg-t-10">
                <div className="card pos-relative">
                    <div className="pos-absolute t--5 l--5 wd-70 ht-70">
                        <img className="img-fluid"  src="/assets/images/sponsor-one.png" />
                    </div>
                    <div className="media align-items-center ht-200">
                        <div className="media-body pd-x-20 col-6">
                            <h5 className="mg-b-12 tx-18 tx-semibold">Regalix Inc.</h5>
                            <p className="tx-12 mg-b-10">Regalix is a global leader partnering with companies on sales enablement, revenue operations and thought-leadership.</p>
                            <Link className="tx-11 tx-bold" to={"/sponsors/regalix"}>Learn More</Link>
                        </div>
                        <div className="col-6 text-center pd-0">
                            <img src="https://via.placeholder.com/278x195" className="img-fluid rounded" alt="" />
                        </div>
                    </div>
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

export default SponsorCardOne
