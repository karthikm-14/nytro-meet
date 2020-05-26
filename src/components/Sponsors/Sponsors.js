import React from 'react'
import Search from '../common/Search'
import SponsorsList from './SponsorsList'


const Sponsors = () => {
    return (
        <div className="content ht-100v pd-0">
            <Search />
            <div className="content-body">
                <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item active" aria-current="page">Sponsors</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row row-xs">
                        <div className="col-12">
                            <h6 className="mg-b-15 tx-18 tx-bold">Sponsors<span className="tx-gray-500 tx-16 tx-normal"> (13)</span></h6>
                            <SponsorsList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sponsors
