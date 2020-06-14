import React, { Fragment, useState } from 'react'
import SpeakersList from './SpeakersList'
import wowzaJS from '../../modules/wowza'


const WatchNow = (props) => {

    let [activeEmbedPlayer, setActiveEmbedPlayer] = useState(false)
    
    let { title, description, speakers, status, eventBannerURL } = {...props.event}
    let embedPlayer = props.event.eventBridgeR && props.event.eventBridgeR.playerEmbedCode
    eventBannerURL = eventBannerURL ? eventBannerURL : "/assets/images/watch-now-bg.jpg";

    const showEmbedPlayer = (streamToken) => {
        wowzaJS('', `//player.cloud.wowza.com/hosted/${streamToken}/wowza.js`)
        setActiveEmbedPlayer(true)
    }
    
    return (
        <Fragment>
            {
                props.event.title ?
                    <div className="card bg-dark text-white">
                        {
                        !activeEmbedPlayer ?
                        <Fragment>
                            <div 
                                className="w-100 rounded-5 card-img ht-480" 
                                style={{backgroundImage: `url(${eventBannerURL})`, backgroundSize: 'cover'}} >
                            </div>
                            <div className="card-img-overlay">
                            <div className="card-body pos-absolute b-20">
                                { status === 'LIVE' ? 
                                    <span className="btn-danger d-inline-flex align-items-center p-0 px-2 tx-12 tx-bold mg-b-10">
                                        <span className="d-inline-block wd-7 ht-7 bg-gray-100 rounded-circle mg-r-5"></span> LIVE
                                    </span> :
                                    null
                                }
                                <h5 className="card-title tx-36 tx-light">{ title }</h5>
                                <h6 className="card-subtitle mb-3 mt-2 text-muted">
                                    <SpeakersList expand={ true } speakers={ speakers } />
                                </h6>
                                <p className="card-text">{ description } </p>
                                {
                                    embedPlayer ?
                                    <button className="btn btn-primary mg-t-10 tx-11 tx-bold" onClick={ () => showEmbedPlayer('kj8jff0z') }>Watch Now</button> :
                                    null
                                }
                            </div>
                            </div>
                        </Fragment> :
                        <Fragment>
                            <div id='wowza_player' className="ht-480 wd-100p d-flex align-items-center justify-content-center">
                                <div className="spinner-grow pos-absolute" role="status">
                                <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </Fragment>
                        }
                    </div> :
                    'No Live events happening...'
            }
        </Fragment>
    )
}

export default WatchNow
