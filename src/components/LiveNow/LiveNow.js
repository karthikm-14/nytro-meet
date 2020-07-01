import React, { useState, useEffect, Fragment } from 'react'
import LiveNowCard from '../common/LiveNowCard'
import Search from '../common/Search'
import './livenow.css'
import API from '../../utils/api'


const LiveNow = () => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        API.get('user/jhi-live-events?eagerload=true')
            .then(response => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch(response => console.log(response));
    }, [])

    return (
        <div className="content ht-100v pd-0">
            <div className="content-body">
                <div className="container pd-x-0">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item active" aria-current="page">live now</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <h6 className="mg-b-10 tx-16 tx-normal">Live Now</h6>
                    <div className="row row-xs">
                        { !isLoading ? 
                            <LiveNowCard data={ data } /> :
                            <Fragment>
                                <div className="col-sm-6">
                                    <div className="live-now-wrapper bg-gray-400 col-xs-6 rounded pos-relative">
                                        <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                            <div className="line"></div>
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="live-now-wrapper bg-gray-400 col-xs-6 rounded pos-relative">
                                        <div className="placeholder-paragraph pd-20 pos-absolute wd-100p b-0">
                                            <div className="line"></div>
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveNow
