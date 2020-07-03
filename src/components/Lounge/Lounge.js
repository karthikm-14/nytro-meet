import React from 'react'
import Attendees from './Attendees'
import Speakers from './Speakers'


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
                                    <a className="nav-link active" id="speakers-tab" data-toggle="tab" href="#speakers" role="tab" aria-controls="speakers" aria-selected="true">Speakers</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="attendees-tab" data-toggle="tab" href="#attendees" role="tab" aria-controls="attendees" aria-selected="true">Attendees</a>
                                </li>
                            </ul>

                            <div className="tab-content pd-l-0 pd-t-35 pd-b-20" id="myTabContent">
                                <div className="tab-pane fade show active" id="speakers" role="tabpanel" aria-labelledby="speakers-tab">
                                    <Speakers />
                                </div>
                                <div className="tab-pane fade show" id="attendees" role="tabpanel" aria-labelledby="attendees-tab">
                                    <Attendees />
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
