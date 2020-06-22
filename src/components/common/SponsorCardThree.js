import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightCircle } from 'react-feather'


const SponsorCardThree = (props) => {

    const items = props.data.map(item => {
        let { id, companyLogo, name, about } = { ...item }
        return  <div key={id} className="col-lg-3 mg-t-15">
                    <div className="card ht-152 overflow-hidden">
                        <div className="ht-100 d-flex justify-content-center align-items-center bg-white">
                            <img src={ companyLogo } className="img-fluid rounded ht-70p" alt={ name } />
                        </div>
                        <Link to={`/sponsors/${id}`} className="d-flex justify-content-between align-items-center pd-15">
                            <h5 className="mb-0 tx-12 tx-semibold">{ name }</h5>
                            <ArrowRightCircle />
                        </Link>
                    </div>
                </div>
    })

    return (
        <Fragment>
            { items }
        </Fragment>
    )
}

export default SponsorCardThree
