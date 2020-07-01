import React from 'react'
import Search from '../common/Search'
import Profiles from './Profiles'


const Lounge = () => {
    return (
        <div className="content ht-100v pd-0">
            <div className="content-body">
                <div className="container pd-x-0 tx-13">
                    <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                    <li className="breadcrumb-item active" aria-current="page">Lounge</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ul className="nav nav-line">
                                <li className="nav-item">
                                    <a className="nav-link active" id="profiles-tab" data-toggle="tab" href="#profiles" role="tab" aria-controls="profiles" aria-selected="true">Profiles</a>
                                </li>
                            </ul>

                            <div className="tab-content pd-l-0 pd-t-35 pd-b-20" id="myTabContent">
                                <div className="tab-pane fade show active" id="profiles" role="tabpanel" aria-labelledby="profiles-tab">
                                    <Profiles />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lounge
