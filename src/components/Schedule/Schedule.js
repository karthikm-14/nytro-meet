import React from 'react'
import DateCardView from '../common/DateCardView'
import Search from '../common/Search'
import StageListView from './StageListView'


const Schedule = () => {
    return (
        <div className="content ht-100v pd-0">
            <Search />
            <div className="content-body">
                <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item active" aria-current="page">Schedule</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row row-xs">
                        <div className="col-12">
                            <h6 className="mg-b-10 tx-16 tx-normal">Full Schedule</h6>
                            <div className="row row-xs">
                                <DateCardView itemsCount={ 3 } colSm={ 6 } colMd={ 4 } colXl={ 3 } />
                            </div>
                        </div>
                    </div>
                    <StageListView itemsCount={ 3 } />
                </div>
            </div>
        </div>
    )
}

export default Schedule
