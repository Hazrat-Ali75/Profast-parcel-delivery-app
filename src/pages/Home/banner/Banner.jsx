import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
        <Carousel
        autoPlay={true}
        showThumbs = {false}
        infiniteLoop = {true}
        >
            <div>
                <img src={bannerImg1} alt="" />
            </div>
            <div>
                <img src={bannerImg2} alt="" />
            </div>
            <div>
                <img src={bannerImg3} alt="" />
            </div>
        </Carousel>
    );
};

export default Banner;