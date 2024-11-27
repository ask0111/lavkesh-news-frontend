// Carousel.tsx
"use client";
import React, { Children } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { DivBox } from "../sections/HomeSections";

interface CarouselProps {
  perItem: number; 
  newsData?: any;
  children: any;
}

const Carousel: React.FC<CarouselProps> = ({children ,newsData, perItem }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: perItem || 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
};

export default Carousel;
