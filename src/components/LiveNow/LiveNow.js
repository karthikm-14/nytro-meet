import React from 'react'
import LiveNowCard from '../common/LiveNowCard'
import Search from '../common/Search'
import './livenow.css'


const LiveNow = () => {
    return (
        <div className="content ht-100v pd-0">
            <Search />
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
                        <LiveNowCard itemsCount= { 3 } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveNow
