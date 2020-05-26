import React from 'react'
import EventCardView from '../common/EventCardView'
import Search from '../common/Search'
import { Link } from 'react-router-dom'
import StreamingView from '../common/StreamingView'


const LiveAndUpcoming = () => {
    return (
        <div className="content ht-100v pd-0">
            <Search />
            <div className="content-body">
                <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item"><Link to={ '/live-now' }>live now</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">marketing stage</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row row-xs">
                        <div className="col-lg-3">
                            <h6 className="mg-b-10 tx-16 tx-normal">Live Now</h6>
                            <EventCardView itemsCount={ 1 } />
                        </div>
                        <div className="col-lg-9">
                            <div className="row row-xs">
                                <div className="col-12">
                                    <h6 className="mg-b-10 tx-16 tx-normal">Coming Up Next...</h6>
                                    <div className="row row-xs">
                                        <EventCardView itemsCount={ 3 } colSm={ 6 } colLg={ 4 } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-xs mg-t-20">
                        <div className="col-lg-8">
                            <StreamingView />
                        </div>
                        <div className="col-lg-4 mg-t-10 mg-lg-t-0">
                            <div className="row row-xs">
                                <div className="col-12">
                                    <div className="row row-xs">
                                        <EventCardView itemsCount={ 4 } colSm={ 6 } colLg={ 12 } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveAndUpcoming
