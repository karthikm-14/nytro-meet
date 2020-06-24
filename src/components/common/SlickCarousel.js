import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpeakersList from './SpeakersList';


const SlickCarousel = (props) => {

    const [data, setData] = useState(props.sessions)

    const settings = {
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const items = data && data.map((session,i) => {
        let { id, title, speakers, eventBannerURL } = { ...session, ...session.speakers }
        eventBannerURL = eventBannerURL ? eventBannerURL : '';
        return  <Link to={{pathname: `/live-now/${session.stage.title}`, sessionId: id}} key={i} className="row-xs cursor-pointer">
                    <div className="slider-item">
                        <div 
                            className="w-100 rounded-5 ht-164" 
                            style={{backgroundImage: `url(${eventBannerURL})`, backgroundSize: 'cover', backgroundPosition: 'center'}} >
                        </div>
                        <h5 title="google" className="mg-y-10 tx-14 tx-semibold">{ title }</h5>
                        <p className="tx-12 tx-color-03 tx-semibold">
                            { speakers && speakers.length ? <SpeakersList speakers={ speakers } /> : null }
                        </p>
                    </div>
                </Link>
    })

    return (
        <Fragment>
            <Slider {...settings}>
                { items }
            </Slider>
        </Fragment>
    )
}


export default SlickCarousel
