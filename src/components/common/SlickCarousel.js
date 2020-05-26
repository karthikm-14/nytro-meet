import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SlickCarousel = () => {

    const items = []

    for(let i=0;i<7;i++) {
        items.push(
            <a key={i} href="" className="row-xs">
                <div className="slider-item">
                    <div className="slider-icon">
                        <img className="img-fluid rounded" src="https://via.placeholder.com/278x164" />
                    </div>
                    <h5 title="google" className="mg-y-10 tx-14 tx-semibold">Lorem Ipsum Dolor Sit Amet Egestas</h5>
                    <p className="tx-12 tx-color-03 tx-semibold">James Allison</p>
                </div>
            </a>
        )
    }

    
    const settings = {
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
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

    return (
        <Slider {...settings}>
            { items }
        </Slider>
    )
}


export default SlickCarousel
