import React from 'react'


const StageListView = (props) => {

    const items = []

    for(let i=0;i<props.itemsCount;i++) {
        items.push(
            <div key={i} className="card mg-0-f">
                <h6 className="mg-b-10 tx-16 tx-normal">Sales Stage</h6>
                <div className="card mg-0-f">
                    <div className="card-body">
                        <div className="media align-items-center">
                            <img src="https://via.placeholder.com/68" className="wd-68 rounded mg-r-10" alt="" />
                            <div className={`media-body lh-normal ${i===0 ? 'event-expired': ''}`}>
                                <h5 className="tx-13 lh-2">Cloud Storage Market: Key Players, Growth, Analysis, 2020-2026</h5>
                                <p className="tx-12 mg-b-2 tx-semibold">9:00 AM - 10:00 AM </p>
                                <small className="tx-10 text-primary tx-semibold">Gregory Steven + 1 More</small>
                            </div>
                            <div className="dropdown dropleft tx-24">
                                <summary className="link-03 lh-0 mg-l-10" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="icon ion-md-more"></i></summary>
                                <div className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link d-flex align-items-center tx-gray-500 pd-5 tx-10 tx-semibold">
                                            <i className="icon ion-md-alarm mg-r-10 tx-16"></i><span>Set Reminder</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link d-flex align-items-center tx-gray-500 pd-5 tx-10 tx-semibold">
                                            <i data-feather="mail" className="mg-r-10 ht-15 wd-15"></i> <span>Contact Speaker</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link d-flex align-items-center tx-gray-500 pd-5 tx-10 tx-semibold">
                                            <i data-feather="copy" className="mg-r-10 ht-15 wd-15"></i> <span>Save Attachments</span>
                                        </a>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="media align-items-center">
                            <img src="https://via.placeholder.com/68" className="wd-68 rounded mg-r-10" alt="" />
                            <div className="media-body lh-normal">
                                <h5 className="tx-13 lh-2">Cloud Storage Market: Key Players, Growth, Analysis, 2020-2026</h5>
                                <p className="tx-12 mg-b-2 tx-semibold">9:00 AM - 10:00 AM </p>
                                <small className="tx-10 text-primary tx-semibold">Gregory Steven + 1 More</small>
                            </div>
                            <div className="dropdown dropleft tx-24">
                                <summary className="link-03 lh-0 mg-l-10" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="icon ion-md-more"></i></summary>
                                <div className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link d-flex align-items-center tx-gray-500 pd-5 tx-10 tx-semibold">
                                            <i className="icon ion-md-alarm mg-r-10 tx-16"></i><span>Set Reminder</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link d-flex align-items-center tx-gray-500 pd-5 tx-10 tx-semibold">
                                            <i data-feather="mail" className="mg-r-10 ht-15 wd-15"></i> <span>Contact Speaker</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link d-flex align-items-center tx-gray-500 pd-5 tx-10 tx-semibold">
                                            <i data-feather="copy" className="mg-r-10 ht-15 wd-15"></i> <span>Save Attachments</span>
                                        </a>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="row row-xs mg-t-35">
            <div className="col-12">
                <div className="card-deck row-xs">
                    { items }
                </div>
            </div>
        </div>
    )
}

export default StageListView
