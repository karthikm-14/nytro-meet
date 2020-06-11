import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const liveNowCard = (props) => {

    const data = [...props.data];
    
    const items = data.map(item => {
        let banner_url = item.banner_url ? item.banner_url : "/assets/images/watch-now-bg.jpg";
        return <div key={ item.id } className="col-xs-12 col-md-6 mg-b-10">
                    <Link to={ `/live-now/${item['stage-title']}` }>
                        <div className="card bg-dark text-white live-now-wrapper">
                            <img alt="live-now" className="h-100 rounded-5 img-fluid" src={banner_url} />
                            <div className="card-img-overlay">
                            <div className="pos-absolute b-20 l-20 r-20">
                                <span className="btn-danger d-inline-flex align-items-center p-0 px-2 tx-12 tx-bold mg-b-10">
                                    <span className="d-inline-block wd-7 ht-7 bg-gray-100 rounded-circle mg-r-5"></span> LIVE
                                </span>
                                <h5 className="card-title tx-36 tx-light">{ item['stage-title'] }</h5>
                                <h6 className="mb-3 mt-2 text-muted tx-14 tx-semibold d-flex align-items-center"><i className="fas fa-user mg-r-5"></i> { item['live-audience-count'] } Watching Now</h6>
                                <p className="card-text">{ item.description }</p>
                            </div>
                            </div>
                        </div>
                    </Link>
                </div>
    })

    return (
        <Fragment>
            { items }
        </Fragment>
    )
}

export default liveNowCard
