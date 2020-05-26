import React from 'react'

const ProfileFilters = () => {
    return (
        <div className="row row-xs pd-l-15">
            <div className="col-sm-6 col-md-4 col-lg-12 mg-t-40 mg-md-t-0">
                <h6 className="tx-13 tx-spacing-1 tx-uppercase tx-semibold mg-b-15">Discover By Position</h6>

                <nav className="nav nav-classic tx-12 tx-semibold">
                    <a href="" className="nav-link"><span>Software Engineer</span> <span className="badge">20</span></a>
                    <a href="" className="nav-link"><span>UI/UX Designer</span> <span className="badge">18</span></a>
                    <a href="" className="nav-link"><span>Sales Representative</span> <span className="badge">14</span></a>
                    <a href="" className="nav-link"><span>Product Representative</span> <span className="badge">12</span></a>
                    <a href="" className="nav-link"><span>Full-Stack Developer</span> <span className="badge">10</span></a>
                </nav>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-12 mg-t-40 mg-md-t-0 mg-lg-t-40">
                <h6 className="tx-13 tx-spacing-1 tx-uppercase tx-semibold mg-b-15">Discover By Location</h6>

                <nav className="nav nav-classic tx-12 tx-semibold">
                    <a href="" className="nav-link"><span>San Francisco, California</span> <span className="badge">20</span></a>
                    <a href="" className="nav-link"><span>Los Angeles, California</span> <span className="badge">18</span></a>
                    <a href="" className="nav-link"><span>Las Vegas, Nevada</span> <span className="badge">14</span></a>
                    <a href="" className="nav-link"><span>Austin, Texas</span> <span className="badge">12</span></a>
                    <a href="" className="nav-link"><span>Arlington, Nebraska</span> <span className="badge">10</span></a>
                </nav>
            </div>
        </div>
    )
}

export default ProfileFilters
