// Carousel.tsx
"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { DivBox } from "../sections/HomeSections";

interface CarouselProps {
  perItem: number; 
}

const Carousel: React.FC<CarouselProps> = ({ perItem }) => {
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

  const newsData = [
    {
      image: "https://images.pexels.com/photos/592552/pexels-photo-592552.jpeg",
      type: "Business",
      date: new Date("2024-11-01").toDateString(),
      title: "Top 10 Business Strategies for 2024",
    },
    {
      image: "https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg",
      type: "Technology",
      date: new Date("2024-10-28").toDateString(),
      title: "The Rise of Virtual Reality in Gaming",
    },
    {
      image: "https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg",
      type: "Finance",
      date: new Date("2024-10-25").toDateString(),
      title: "5 Investment Tips for the Coming Year",
    },
    {
      image:
        "https://images.pexels.com/photos/3831164/pexels-photo-3831164.jpeg",
      type: "Marketing",
      date: new Date("2024-10-20").toDateString(),
      title: "Innovative Marketing Trends to Watch",
    },
    {
      image:
        "https://images.pexels.com/photos/3184322/pexels-photo-3184322.jpeg",
      type: "Startup",
      date: new Date("2024-10-15").toDateString(),
      title: "How to Launch a Successful Startup",
    },
    {
      image:
        "https://images.pexels.com/photos/3825532/pexels-photo-3825532.jpeg",
      type: "Technology",
      date: new Date("2024-10-10").toDateString(),
      title: "Artificial Intelligence: Transforming Industries",
    },
    {
      image:
        "https://images.pexels.com/photos/3861480/pexels-photo-3861480.jpeg",
      type: "Health",
      date: new Date("2024-10-05").toDateString(),
      title: "10 Health Tips for a Better Lifestyle",
    },
    {
      image:
        "https://images.pexels.com/photos/1600432/pexels-photo-1600432.jpeg",
      type: "E-commerce",
      date: new Date("2024-09-30").toDateString(),
      title: "The Future of E-commerce: Trends to Follow",
    },
    {
      image:
        "https://images.pexels.com/photos/2253588/pexels-photo-2253588.jpeg",
      type: "Environment",
      date: new Date("2024-09-25").toDateString(),
      title: "Sustainable Practices for Modern Businesses",
    },
    {
      image:
        "https://images.pexels.com/photos/1569018/pexels-photo-1569018.jpeg",
      type: "Career",
      date: new Date("2024-09-20").toDateString(),
      title: "Building a Successful Career in Tech",
    },
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {newsData.map(({ image, type, date, title }, index) => (
          <div key={index} className="relative group px-2">
            <DivBox
              key={1}
              width={"w-[100%]"}
              height={"h-[60vh]"}
              position="absolute bottom-10 text-white px-10 text-h6"
              textSize="text-h3"
              imageSrc={image}
              type={type}
              date={date}
              title={title}
            />
            {/* //     <img className="w-full rounded-lg transition duration-300 ease-in-out" src={image} alt={`Slide ${index + 1}`} />
        //     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
        //       <h2 className="text-white text-xl font-bold">Slide {index + 1}</h2>
        //     </div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
