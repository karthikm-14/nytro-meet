import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const SponsorCardTwo = () => {

    const items = []

    for(let i=0;i<3;i++) {
        items.push(
            <div key={i} className="col-lg-4 mg-t-10">
                <div className="card pos-relative">
                    <div className="pos-absolute t--5 l--5 wd-70 ht-70">
                        <img className="img-fluid"  src="/assets/images/sponsor-two.png" />
                    </div>
                    <div className="ht-160">
                        <div className="ht-100 d-flex justify-content-center align-items-center">
                            <img src="https://via.placeholder.com/278x195" className="img-fluid rounded ht-70p" alt="" />
                        </div>
                        <Link to={"#"} className="d-flex justify-content-between align-items-center pd-15">
                            <h5 className="mb-0 tx-12 tx-semibold">Ultrex Systems Inc. </h5>
                            <i data-feather="arrow-right-circle" className="color-white"></i>
                        </Link>
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

export default SponsorCardTwo
