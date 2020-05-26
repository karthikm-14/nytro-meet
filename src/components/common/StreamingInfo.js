import React, { Fragment } from 'react'


const StreamingInfo = () => {
    return (
        <Fragment>
            <ul className="nav nav-line">
                <li className="nav-item">
                    <a className="nav-link active" id="about-tab" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="true">About</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="speakers-tab" data-toggle="tab" href="#speakers" role="tab" aria-controls="speakers" aria-selected="false">Speakers</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="attachments-tab" data-toggle="tab" href="#attachments" role="tab" aria-controls="attachments" aria-selected="false">Attachments</a>
                </li>
            </ul>
            <div className="tab-content pd-l-0 pd-t-20 pd-r-20 pd-b-20" id="myTabContent">
                <div className="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec eleifend nibh. Aliquam dictum turpis in arcu lobortis dictum. Etiam euismod cursus neque ut posuere. Etiam ut lectus leo. Sed molestie rhoncus velit eget pellentesque. Cras et nullam.</p>
                </div>
                <div className="tab-pane fade" id="speakers" role="tabpanel" aria-labelledby="speakers-tab">
                    <h6>speakers</h6>
                    <p>...</p>
                </div>
                <div className="tab-pane fade bd bd-2 rounded-5" id="attachments" role="tabpanel" aria-labelledby="attachments-tab">
                    <div className="card card-body">
                        <div className="media">
                            <span className="tx-color-04"><i className="fas fa-file-pdf tx-30 mg-t-5" aria-hidden="true"></i></span>
                            <div className="media-body mg-l-20">
                                <h6 className="mg-b-8 tx-semibold">Case Study: Impacts of Population Influx on Modern Society in the 21st Century</h6>
                                <p className="tx-color-03 tx-semibold tx-10">3.5 MB</p>
                                <a href="#" className="card-link tx-bold tx-10">DOWNLOAD</a>
                                <a href="#" className="card-link tx-bold tx-10">SAVE TO MY FILES</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StreamingInfo
