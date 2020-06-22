import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const SponsorCardOne = (props) => {

    const items = props.data.map(item => {
        let { id, companyLogo, name, about } = { ...item }
        return <div key={id} className="col-lg-6 mg-t-10">
                    <div className="card pos-relative">
                        <div className="pos-absolute t--5 l--5 wd-70 ht-70">
                            <img className="img-fluid"  src="/assets/images/sponsor-one.png" alt="sponsor tag" />
                        </div>
                        <div className="media align-items-center ht-200">
                            <div className="media-body pd-x-20 col-6">
                                <h5 className="mg-b-12 tx-18 tx-semibold">{ name }</h5>
                                <p className="tx-12 mg-b-10">{ about }</p>
                                <Link className="tx-11 tx-bold" to={`/sponsors/${id}`}>Learn More</Link>
                            </div>
                            <div className="col-6 text-center pd-0 d-flex align-items-center align-self-stretch bg-gray-800 pd-40 premiere-sponsor-overlay border-t-r-r border-b-r-r">
                                <img src={ companyLogo } className="img-fluid rounded mh-100 img-fit-contain" alt={ name } />
                            </div>
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

export default SponsorCardOne
