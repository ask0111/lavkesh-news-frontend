"use client"
import React from "react";
import Image from "next/image";
import { BiSolidRightArrow } from "react-icons/bi";
import Carousel from "../carousal/CarousalSlider";
import { newsData } from "../data/data";

export const HomeSections = ({props}: {props: any}) => {
  const latestNewsArray = [
    {
      image:
        "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
      type: "bussiness",
      date: new Date().toDateString(),
      title:
        "To add text overlay on the images in your carousel and change the image's color to a dark overlay on hover, you can achieve this with CSS. Below is an updated version of your ",
    },
    {
      image:
        "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
      type: "bussiness",
      date: new Date().toDateString(),
      title:
        "To add text overlay on the images in your carousel and change the image's color to a dark overlay on hover, you can achieve this with CSS. Below is an updated version of your ",
    },
    {
      image:
        "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
      type: "bussiness",
      date: new Date().toDateString(),
      title:
        "To add text overlay on the images in your carousel and change the image's color to a dark overlay on hover, you can achieve this with CSS. Below is an updated version of your ",
    },
    {
      image:
        "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
      type: "bussiness",
      date: new Date().toDateString(),
      title:
        "To add text overlay on the images in your carousel and change the image's color to a dark overlay on hover, you can achieve this with CSS. Below is an updated version of your ",
    },
    {
      image:
        "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
      type: "bussiness",
      date: new Date().toDateString(),
      title:
        "To add text overlay on the images in your carousel and change the image's color to a dark overlay on hover, you can achieve this with CSS. Below is an updated version of your ",
    },
    {
      image:
        "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
      type: "bussiness",
      date: new Date().toDateString(),
      title:
        "To add text overlay on the images in your carousel and change the image's color to a dark overlay on hover, you can achieve this with CSS. Below is an updated version of your ",
    },
  ];
  const storiesNewsArray = [
    {
      image:
        "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
      type: "bussiness",
      date: new Date().toDateString(),
      title:
        "To add text overlay on the images in your carousel and change the image's color to a dark overlay on hover, you can achieve this with CSS. Below is an updated version of your ",
    },
  ];
  return (
    <section className="">
      <div className="flex gap-3 justify-between mt-4">
        <div className="w-[40rem]">
          <TitleNews title="Stories" />
          <Carousel perItem={1}>
          {props.map(({url, image, categories, createAt, title }: any) => (
            <DivBox
              key={1}
              width={"w-[40rem]"}
              height={"h-[100vh]"}
              position="absolute bottom-10 text-white px-10 text-h6"
              textSize="text-h3"
              imageSrc={image}
              type={categories}
              date={createAt}
              title={title}
              url={url}
            />
          ))}
          </Carousel>
        </div>
        <div>
          <TitleNews title="Latest" />
          <div className="flex flex-wrap gap-3 ">
            {latestNewsArray.map(({ image, type, date, title }, index) => (
              <DivBox
                key={index}
                width={"w-[12rem]"}
                height={"h-[8rem]"}
                position="static"
                textSize="text-h6"
                imageSrc={image}
                type={type}
                date={date}
                title={title}
                url={""}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="w-full">
          <TitleNews title="Sports" />
          <Carousel perItem={3} >
          {newsData.map(({ url, image, type, date, title }: any, index: number) => (
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
              url={url}
            />
            {/* //     <img className="w-full rounded-lg transition duration-300 ease-in-out" src={image} alt={`Slide ${index + 1}`} />
        //     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
        //       <h2 className="text-white text-xl font-bold">Slide {index + 1}</h2>
        //     </div> */}
          </div>
        ))}
          </Carousel>
        </div>
        <br />
        <br />
        <div className="flex flex-wrap gap-y-4 justify-between">
          {
            ["Cricket", "Archey", "Runing", "Hockey", "Footwall", "Boxing"].map((title, index)=> 
        <div key={index}>
          <TitleNews title={title} />
          {latestNewsArray.map(({ image, type, date, title }, index) => (
            <HorizontalDivBox
              key={index}
              width={"w-[12rem]"}
              height={"h-[8rem]"}
              position="static"
              textSize="text-h6"
              imageSrc={image}
              type={type}
              date={date}
              title={title}
              url={""}
            />
          ))}
        </div>
            )
          }

        </div>
      </div>
    </section>
  );
};

const TitleNews = ({ title }: { title: string }) => {
  return (
    <h4 className="text-h4 font-extrabold text-purple-500 flex items-center gap-3 mb-1">
      {title} <BiSolidRightArrow />
    </h4>
  );
};

interface DivBoxProps {
  width: string;
  height: string;
  position: string;
  textSize: string;
  imageSrc: string;
  type: string;
  date: string;
  title: string;
  url: string;
}

export const DivBox: React.FC<DivBoxProps> = ({
  width,
  height,
  position,
  textSize,
  imageSrc,
  type,
  date,
  title,
  url,
}) => {
  return (
    <>
      <div
        className={`${width} mb-4 overflow-hidden rounded-xl bg-slate-50 relative`}
        onClick={()=> window.location.href = process.env.NEXT_PUBLIC_FRONTEND_URL + "/" + url }
      >
        <div className={`${width} ${height} object-cover`}>
          <Image
            src={imageSrc}
            width={1000}
            height={1000}
            className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-110"
            alt="Image"
          />
          {position.includes("absolute") ? (
            <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 transition duration-300 ease-in-out"></div>
          ) : (
            ""
          )}
        </div>
        <div className={`${width} p-4 ${position} cursor-pointer`}>
          <p className="text-xs ">
            <span className="font-bold text-fuchsia-500">{type}</span> /{" "}
            <span>{date}</span>{" "}
          </p>
          <h2 className={`${textSize} font-extrabold`}>{title} </h2>
        </div>
      </div>
    </>
  );
};

export const HorizontalDivBox: React.FC<DivBoxProps> = ({
  width,
  height,
  position,
  textSize,
  imageSrc,
  type,
  date,
  title,
  url,
}) => {
  return (
    <div
      className={`flex items-center w-[400px] mb-2 overflow-hidden rounded-xl bg-slate-50 relative`}
    >
      {/* Image Section */}
      <div className={`w-24 h-24 flex-shrink-0`}>
        <Image
          src={imageSrc}
          width={300} // Adjust width and height as needed
          height={200} // Adjust width and height as needed
          className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
          alt="Image"
        />
        {position.includes("absolute") ? (
          <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 transition duration-300 ease-in-out"></div>
        ) : null}
      </div>

      {/* Text Section */}
      <div className="p-4 flex flex-col justify-center w-full">
        <p className="text-xs">
          <span className="font-bold text-fuchsia-500">{type}</span> /{" "}
          <span>{date}</span>
        </p>
        <h2 className={`${textSize} font-extrabold line-clamp-3`}>{title}</h2>
      </div>
    </div>
  );
};
