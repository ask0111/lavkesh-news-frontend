import React from "react";
import Image from "next/image";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import Slider from "react-slick";
import Carousel from "@/components/carousal/CarousalSlider";
import { apiService } from "@/services/axios.service";
import NotFoundPage from "@/app/private/rbac/admin-panel/[slug]/page";
import { newsData } from "@/components/data/data";
import { DivBox } from "@/components/sections/HomeSections";

const news = [
  {
    id: 1,
    image:
      "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
    title: "Exploring Real Estate Trends in 2024",
    date: new Date("2024-10-28").toDateString(),
  },
  {
    id: 2,
    image:
      "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/vr-headset-80x80.jpg",
    title: "Virtual Reality’s Role in Modern Education",
    date: new Date("2024-10-20").toDateString(),
  },
  {
    id: 3,
    image:
      "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/startup-400x240.jpg",
    title: "Startup Strategies for Growth in Emerging Markets",
    date: new Date("2024-10-15").toDateString(),
  },
  {
    id: 4,
    image:
      "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
    title: "Exploring Real Estate Trends in 2024",
    date: new Date("2024-10-28").toDateString(),
  },
  {
    id: 5,
    image:
      "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/vr-headset-80x80.jpg",
    title: "Virtual Reality’s Role in Modern Education",
    date: new Date("2024-10-20").toDateString(),
  },
  {
    id: 6,
    image:
      "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/startup-400x240.jpg",
    title: "Startup Strategies for Growth in Emerging Markets",
    date: new Date("2024-10-15").toDateString(),
  },
  {
    id: 8,
    image:
      "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/apartments-400x240.jpg",
    title: "Exploring Real Estate Trends in 2024",
    date: new Date("2024-10-28").toDateString(),
  },
  {
    id: 9,
    image:
      "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/vr-headset-80x80.jpg",
    title: "Virtual Reality’s Role in Modern Education",
    date: new Date("2024-10-20").toDateString(),
  },
  {
    id: 10,
    image:
      "https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/startup-400x240.jpg",
    title: "Startup Strategies for Growth in Emerging Markets",
    date: new Date("2024-10-15").toDateString(),
  },
];

export default async function ({ params }: any) {
  const { slug, id } = await params;
  try {
    const res = await apiService.get(`/blogs?url=${slug}/${id}`);
    const response = res.data;
    const post = response.data[0];
    if (!response.status) throw new Error("Post not found");
    return (
      <div className="w-full  bg-slate-100">
        <div className="w-[75%] m-auto bg-white p-12">
          <div>
            <h1 className="text-h1 font-black font-serif">{post?.title} </h1>
            <br />
            <p className="pb-2">{post?.subTitle}</p>
          </div>
          <div className="p-4 bg-white shadow-s flex justify-between items-center rounded-lg border border-gray-200">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-m hover:shadow-lg transition-shadow duration-300">
              <img
                src={
                  post?.author?.avtaar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={"name"}
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-500"
              />
              <div>
                <h3 className="text-lg font-semibold">{post?.author?.name || "unknown"}</h3>
                <p className="text-gray-600">Posts: {"100"}</p>
              </div>
            </div>
            {/* Update time */}
            <div>
              <div className="flex items-center text-gray-600 mb-4">
                <AiOutlineClockCircle className="mr-2 text-lg" />
                <span>
                  Published on{" "}
                  <span className="font-h2">{post?.createdAt?.split("T")?.[0]}</span>{" "}
                </span>
              </div>

              {/* Social Media Sharing Icons */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Share on:</p>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-blue-700 hover:text-blue-900 transition duration-300"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={post?.image}
              width={1000}
              height={1000}
              alt="Image"
            />
          </div>
          <div className="mt-2">
            <div
              className="first-letter:uppercase first-latter:tracking-widest
    first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
    first-letter:mr-3 first-letter:float-left text-xl font-sans
  "
  dangerouslySetInnerHTML={{ __html: post?.content }}

            />
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg mt-2">
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          <Carousel perItem={5} >
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
          <br />
          <br />
          <h2 className="text-2xl font-semibold mb-4">Similar News</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
              >
                <Image
                  src={item.image}
                  width={400}
                  height={240}
                  className="w-full h-40 object-cover"
                  alt={item.title}
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-2">
                    <a
                      href={`/news/${item.id}`}
                      className="hover:text-blue-600 transition duration-300"
                    >
                      {item.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error)
    return <NotFoundPage />;
  }
}
