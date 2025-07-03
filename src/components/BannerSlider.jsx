import React from 'react';
import Slider from 'react-slick';
import './BannerSlider.css';

import banner from '../assets/banner/banner.jpg';
import banner4 from '../assets/banner/banner4.jpg';
import banner5 from '../assets/banner/banner5.jpg';

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const banners = [banner, banner4, banner5];

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {banners.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`banner-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
