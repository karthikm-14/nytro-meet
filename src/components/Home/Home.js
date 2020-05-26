import React from 'react'
import WatchNow from '../common/WatchNow'
import EventCardView from '../common/EventCardView'
import SlickCarousel from '../common/SlickCarousel'
import Search from '../common/Search'


const Home = () => {
    return (
        <div className="content ht-100v pd-0">
            <Search />
            <div className="content-body">
                <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row row-xs">
                        <div className="col-lg-9">
                            <h6 className="mg-b-10 tx-16 tx-normal">Live Now</h6>
                            <WatchNow />
                        </div>
                        <div className="col-lg-3 mg-t-10 mg-lg-t-0">
                            <div className="row row-xs">
                                <div className="col-12">
                                    <h6 className="mg-b-10 tx-16 tx-normal">Today</h6>
                                    <div className="row row-xs">
                                        <EventCardView itemsCount={ 4 } colSm={ 6 } colLg={ 12 } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="slider-content" className="mg-t-30">
                        <h6 className="mg-b-10 tx-16 tx-normal">In Case You Missed it...</h6>
                        <SlickCarousel />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
