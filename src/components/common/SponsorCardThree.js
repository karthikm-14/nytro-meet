import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const SponsorCardThree = () => {

    const items = []

    for(let i=0;i<8;i++) {
        items.push(
            <div key={i} className="col-lg-3 mg-t-25">
                <div className="card ht-152 overflow-hidden">
                    <div className="ht-100 d-flex justify-content-center align-items-center bg-white">
                        <img src="https://via.placeholder.com/278x195" className="img-fluid rounded ht-70p" alt="" />
                    </div>
                    <Link to={"#"} className="d-flex justify-content-between align-items-center pd-15">
                        <h5 className="mb-0 tx-12 tx-semibold">Ultrex Systems Inc. </h5>
                        <i data-feather="arrow-right-circle" className="color-white"></i>
                    </Link>
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

export default SponsorCardThree
