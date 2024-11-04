import React from "react";
import Image from "next/image";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import Slider from "react-slick";
import Carousel from "@/components/carousal/CarousalSlider";

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

export default function () {
  return (
    <div className="w-full  bg-slate-100">
      <div className="w-[75%] m-auto bg-white p-12">
        <div>
          <h1 className="text-h1 font-black font-serif">
            MSNBC finishes first in primetime basic cable for first time ever
          </h1>
          <br />
          <p>India on Monday condemned violence that took place outside t ..</p>
        </div>
        <div className="p-4 bg-white shadow-md flex justify-between items-center rounded-lg border border-gray-200">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-m hover:shadow-lg transition-shadow duration-300">
            <img
              src={
                "https://cdn.pixabay.com/photo/2022/04/06/11/30/girl-7115394_640.jpg"
              }
              alt={"name"}
              className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-500"
            />
            <div>
              <h3 className="text-lg font-semibold">{"Hariom Yadav"}</h3>
              <p className="text-gray-600">Posts: {"100"}</p>
            </div>
          </div>
          {/* Update time */}
          <div>
            <div className="flex items-center text-gray-600 mb-4">
              <AiOutlineClockCircle className="mr-2 text-lg" />
              <span>
                Published on{" "}
                <span className="font-h2">{new Date().toDateString()}</span>{" "}
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
            src="https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/vr-headset-400x240.jpg"
            width={1000}
            height={1000}
            alt="Image"
          />
        </div>
        <div className="mt-2">
        <p className="first-letter:uppercase first-latter:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left text-xl font-sans
">
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Advertisement</p>

        </div>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg mt-2">
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        <Carousel perItem={5} />
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
}
