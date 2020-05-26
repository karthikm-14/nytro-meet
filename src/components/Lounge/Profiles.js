import React, { Fragment } from 'react'
import ProfileFilters from './ProfileFilters'


const Profiles = () => {

    const items = []

    for(let i=0;i<10;i++) {
        items.push(
            <div key={i} className="col-sm-4 col-md-3 col-lg-4 col-xl-3">            
                <div className="card card-profile mg-b-10">
                    <img src="https://via.placeholder.com/500" className="card-img-top" alt="" />
                    <div className="card-body tx-13">
                        <div>
                            <a href="">
                                <div className="avatar avatar-lg"><img src="https://via.placeholder.com/350" className="rounded-circle" alt="" /></div>
                            </a>
                            <h4 className="mg-t-10 tx-14"><a href="" className="tx-white">Zhen Juan Chiu</a></h4>
                            <h6 className="tx-11 mg-b-5 tx-gray-500">Software Engineer</h6>
                            <small className="tx-12 text-primary mg-b-10">Nutanix Inc.</small>
                            <div className="d-flex justify-content-between">    
                                <button className="btn btn-dark tx-gray-500 pd-x-12 tx-14 pd-0">
                                    <i data-feather="message-square" className="tx-14"></i>
                                </button>
                                <button className="btn btn-block btn-primary tx-semibold mg-l-10">Add Contact</button>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        )
    }

    return (
        <Fragment>
            <h6 className="mg-b-15 tx-18 tx-bold">Attendees<span className="tx-gray-500 tx-16 tx-normal"> (721)</span></h6>
            <div className="row row-xs mg-b-25 profile-list">
                <div className="col-lg-9 col-xl-9 mg-t-40 mg-lg-t-0">    
                    <div className="row row-xs">
                        { items }
                    </div>
                </div>
                <div className="col-lg-4 col-xl-3 mg-t-40 mg-lg-t-0">
                    <ProfileFilters />
                </div>
            </div>
        </Fragment>
    )
}

export default Profiles
