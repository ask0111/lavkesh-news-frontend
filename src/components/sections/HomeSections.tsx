import React from "react";
import Image from "next/image";
import { BiSolidRightArrow } from "react-icons/bi";
import Carousel from "../carousal/CarousalSlider";
import { newsData } from "../data/data";
import InstagramVideoPlayer from "../video/InstagramVideoPlayer";
import VideoReels from "../video/InstagramVideoPlayer";
import Link from "next/link";
import { fetchApiService } from "@/services/axios.service";

export const HomeSections = async ({ props }: { props: any }) => {
  const latestNews = await fetchApiService("/blogs/", `limit=10`);
  const sportsData = await fetchApiService("/blogs/", `categories=Sports`);

  const newsDatas = await Promise.all(
    ["Cricket", "Archery", "Running", "Hockey", "Football", "Boxing"].map(
      async (path) => {
        return {
          headingTitle: path,
          data: await fetchApiService("/blogs/", `limit=6&categories=${path}`),
        };
      }
    )
  );
  
  return (
    <section className="">
      <div className="flex gap-3 justify-between mt-4">
        <div className="w-[30rem]">
          <TitleNews title="Stories" />
          <Carousel perItem={1}>
            {props.map(({ url, image, categories, createAt, title }: any) => (
              <DivBox
                key={1}
                width={"w-[30rem]"}
                height={"h-[70vh]"}
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
          <TitleNews title="Videos" />
          <VideoReels />
        </div>
        <div>
          <TitleNews title="Latest" />
          <div className="flex flex-col h-[70vh] no-scrollbar flex-wrap overflow-y-scroll gap-3 ">
            {latestNews.map(
              ({ image, categories, createdAt, title }: any, index: number) => (
                <HorizontalDivBox
                  key={index}
                  width={"w-[12rem]"}
                  height={"h-[8rem]"}
                  position="static"
                  textSize="text-h6"
                  imageSrc={image}
                  type={categories[0]}
                  date={createdAt.split("T")[0]}
                  title={title}
                  url={""}
                />
              )
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="w-full">
          <TitleNews title="Sports" />
          <Carousel perItem={3}>
            {[...sportsData, ...sportsData].map(
              ({ url, image, createdAt, title }: any, index: number) => (
                <div key={index} className="relative group px-2">
                  <DivBox
                    key={1}
                    width={"w-[100%]"}
                    height={"h-[60vh]"}
                    position="absolute bottom-10 text-white px-10 text-h6"
                    textSize="text-h3"
                    imageSrc={image}
                    type={'Sports'}
                    date={createdAt.split("T")[0]}
                    title={title}
                    url={url}
                  />
                  {/* //     <img className="w-full rounded-lg transition duration-300 ease-in-out" src={image} alt={`Slide ${index + 1}`} />
        //     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
        //       <h2 className="text-white text-xl font-bold">Slide {index + 1}</h2>
        //     </div> */}
                </div>
              )
            )}
          </Carousel>
        </div>
        <br />
        <br />
        <div className="flex flex-wrap gap-y-4 justify-between">
          {newsDatas?.map(({ headingTitle, data }: any, index: number) => {
            if (!data.length) {
              return <></>;
            } else {
              return (
                <div className="w-auto mb-6 border-t-2" key={index}>
                  <TitleNews title={headingTitle} />
                  {data?.map(
                    ({ image, createdAt, title }: any, index: number) => (
                      <HorizontalDivBox
                        key={index}
                        width={"w-[12rem]"}
                        height={"h-[8rem]"}
                        position="static"
                        textSize="text-h6"
                        imageSrc={image}
                        type={headingTitle}
                        date={createdAt.split("T")[0]}
                        title={title}
                        url={""}
                      />
                    )
                  )}
                  <p className="w-full cursor-pointer hover:underline text-purple-300 hover:text-purple-600 text-end font-extrabold">
                    {" "}
                    <Link href={`/${headingTitle?.toLowerCase()}`}>
                      Read More
                    </Link>
                    ...
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

const TitleNews = ({ title }: { title: string }) => {
  return (
    <h4 className="text-h4 mb-4 font-extrabold text-purple-500 flex items-center gap-3">
      <Link href={`${title?.toLowerCase()}`}>{title}</Link>{" "}
      <BiSolidRightArrow />
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
      <Link
        className={`${width} mb-4 overflow-hidden rounded-xl bg-slate-50 relative`}
        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${url}`}
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
      </Link>
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
      className={`flex h-24 items-center w-[400px] mb-2 overflow-hidden rounded-xl bg-slate-50 relative`}
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
