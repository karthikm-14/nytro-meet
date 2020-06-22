import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightCircle } from 'react-feather';


const SponsorCardTwo = (props) => {

    const items = props.data.map(item => {
        let { id, companyLogo, name, about } = { ...item }
        return  <div key={id} className="col-lg-4 mg-t-10">
                    <div className="card pos-relative">
                        <div className="pos-absolute t--5 l--5 wd-70 ht-70">
                            <img className="img-fluid"  src="/assets/images/sponsor-two.png" />
                        </div>
                        <div className="ht-160">
                            <div className="ht-100 d-flex justify-content-center align-items-center silve-sponsor-overlay border-t-r-r border-b-r-r">
                                <img src={ companyLogo } className="img-fluid rounded ht-70p" alt={ name } />
                            </div>
                            <Link to={`/sponsors/${id}`} className="d-flex justify-content-between align-items-center pd-15">
                                <h5 className="mb-0 tx-12 tx-semibold">{ name }</h5>
                                <ArrowRightCircle />
                            </Link>
                        </div>
                    </div>
                </div>
    })

    return (
        <Fragment>
            { items }
        </Fragment>
    )
}

export default SponsorCardTwo
