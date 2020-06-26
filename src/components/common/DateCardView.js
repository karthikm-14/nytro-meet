import React, { Fragment } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const DateCardView = (props) => {

    const settings = {
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: false,
        initialSlide: props.data.length - 1,
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
    

    const formateDate = (n) => {
        let formatedDate = new Date(n).toLocaleDateString('en-US', {  
            month : 'long',
            day : 'numeric',
            year : 'numeric'
        })
        return formatedDate
    }

    const items = props.data.map((schedule,i) => {
            return <div key={i} className="row-xs">
                        <div className="">
                            <div 
                                className={`bg-dark-hover cursor-pointer card card-body mg-b-10 tx-metropolis-semi-bold ${schedule.date === props.activeDate ? 'bg-dark' : ''} `}
                                onClick={ () => props.getStages(schedule.date) }
                            >
                                <h6 className={`lh-normal text-uppercase ${schedule.date === props.activeDate ? 'text-white' : 'tx-color-03'}`}>{ schedule.day }</h6>
                                <h4 className={`tx-24 ${schedule.date === props.activeDate ? 'text-primary' : ''}`}>{ formateDate(schedule.date) }</h4>
                                <p className={`lh-normal mg-b-0 ${ schedule.date === props.activeDate ? 'text-white' : 'tx-color-03'}`}>{ schedule.totalEvents } Events</p>
                            </div>
                        </div>
                    </div>
    })

    return (
        <div className="date-card-slider">
            <Slider {...settings}>
                { items }
            </Slider>
        </div>
    )
}

export default DateCardView
