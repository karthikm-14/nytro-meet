import React from 'react'
import SponsorCardOne from '../common/SponsorCardOne'
import SponsorCardTwo from '../common/SponsorCardTwo'
import SponsorCardThree from '../common/SponsorCardThree'

const SponsorsList = () => {
    return (
        <div className="row row-xs">
            <div className="col-12 row row-xs">
                <SponsorCardOne />
            </div>
            <div className="col-12 row row-xs mg-t-30">
                <SponsorCardTwo />
            </div>
            <div className="col-12 row row-xs mg-t-20">
                <SponsorCardThree />
            </div>
        </div>
    )
}

export default SponsorsList
