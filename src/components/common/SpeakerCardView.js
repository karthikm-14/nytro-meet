import React from 'react'
import { Link } from 'react-router-dom'

const SpeakerCardView = (props) => {

    let { id, profilePicUrl, name, jobPosition, companyName } = {...props.speaker}

    return (
        <div className={`col-sm-4 col-md-3 col-lg-4 d-flex ${props.colXl ? `mx-wd-xl-20p-f` : 'col-xl-3'}`}>            
            <div className="card card-profile mg-b-10 wd-100p">
                {/* <img src="https://via.placeholder.com/500" className="card-img-top" alt="" /> */}
                <div className="ht-100 card-img-top bg-gray-100"></div>
                <div className="card-body tx-13">
                    <div>
                        <Link to={`/lounge/speaker/${id}`}>
                            <div className="avatar avatar-lg"><img src={profilePicUrl ? profilePicUrl : "https://via.placeholder.com/350"} className="rounded-circle" alt="" /></div>
                        </Link>
                        <Link to={`/lounge/speaker/${id}`} className="tx-white text-center">
                            <h4 className="mg-t-10 tx-14">{ name }</h4>
                        </Link>
                        <h6 className="tx-11 mg-b-5 tx-gray-500">{ jobPosition }</h6>
                        <small className="tx-12 text-primary mg-b-10 text-center">{ companyName }</small>
                        <p></p>
                    </div>
                </div>
            </div>                
        </div>
    )
}

export default SpeakerCardView
