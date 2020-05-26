import React from 'react'


const WatchNow = () => {
    return (
        <div className="card bg-dark text-white">
            <img alt="live-now" className="w-100 rounded-5 card-img" src="/assets/images/watch-now-bg.jpg" />
            <div className="card-img-overlay">
            <div className="card-body pos-absolute b-20">
                <span className="btn-danger d-inline-flex align-items-center p-0 px-2 tx-12 tx-bold mg-b-10">
                    <span className="d-inline-block wd-7 ht-7 bg-gray-100 rounded-circle mg-r-5"></span> LIVE
                </span>
                <h5 className="card-title tx-36 tx-light">Catalyzing the Benefits of Globalization </h5>
                <h6 className="card-subtitle mb-3 mt-2 text-muted">Dr. Frank-Jürgen Richter</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec eleifend nibh. Aliquam dictum turpis in arcu lobortis dictum. Etiam euismod cursus neque ut posuere. Etiam ut lectus leo. Sed molestie rhoncus velit eget pellentesque. Cras et nullam..</p>
                <a href="#" className="btn btn-primary mg-t-10 tx-11 tx-bold">Watch Now</a>
            </div>
            </div>
        </div>
    )
}

export default WatchNow
