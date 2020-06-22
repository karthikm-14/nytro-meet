import React, { useState, useEffect } from 'react'
import SponsorCardOne from '../common/SponsorCardOne'
import SponsorCardTwo from '../common/SponsorCardTwo'
import SponsorCardThree from '../common/SponsorCardThree'

const SponsorsList = (props) => {

    const [premiere, setPremiere] = useState(null)
    const [silver, setSilver] = useState(null)
    const [regular, setRegular] = useState(null)

    useEffect(() => {
        let premier = []
        let silver = []
        let regular = []
        props.data && props.data.map(sponsor => {
            if(sponsor.sponsorType === 'Premiere') {
                premier.push(sponsor)
            } else if(sponsor.sponsorType === 'Silver') {
                silver.push(sponsor)
            } else if(sponsor.sponsorType === 'Regular') {
                regular.push(sponsor)
            }
        })
        setPremiere(premier)
        setSilver(silver)
        setRegular(regular)
    }, [props.data])

    return (
        <div className="row row-xs">
            {
                premiere && premiere.length ? 
                <div className="col-12 row row-xs">
                    <SponsorCardOne data={premiere} />
                </div> :
                null
            }
            {
                silver && silver.length ?
                <div className="col-12 row row-xs mg-t-30">
                    <SponsorCardTwo data={ silver } />
                </div> :
                null
            }
            {
                regular && regular.length ?
                <div className="col-12 row row-xs mg-t-20">
                    <SponsorCardThree data={regular} />
                </div> :
                null
            }
        </div>
    )
}

export default SponsorsList
