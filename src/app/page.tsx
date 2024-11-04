import MainFooter from "@/components/footers/MainFooter";
import { MainHeader } from "@/components/headers/MainHeader";
import { HomeSections } from "@/components/sections/HomeSections";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// app/page.js

export const metadata = {
  title: 'My News Website',
  description: 'This is a description of my website for SEO.',
  keywords: ['news', 'world news', 'TOWN Times', 'latest updates'],
  openGraph: {
    title: 'My Website Title',
    description: 'This is a description of my website for social sharing.',
    url: 'https://example.com',
    images: [
      {
        url: 'https://example.com/image.jpg',
        width: 800,
        height: 600,
        alt: 'My Website Image Alt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Website Title',
    description: 'This is a description of my website for Twitter.',
    images: ['https://example.com/image.jpg'],
  },
};


export default function Home() {
  return (
    <div className="px-2">
      <Image className="w-[100%]" src={'https://www.mvpthemes.com/zoxnews/wp-content/uploads/2022/01/zox-leader.webp'} alt="image" width={1000} height={1000} ></Image>
      <div className="w-[100%] h-[100px] bg-black flex justify-around">
        <div className="h-[100%] flex flex-col justify-center items-center">
          <h1 className="text-white text-h3">{new Date().toLocaleTimeString()}</h1>
          <p className="text-white text-h6">{new Date().toDateString()}</p>
        </div>
        <div className="h-[100%] flex flex-col justify-center items-center">
          <h1 className="text-white text-h1 font-h1 text-center">TOWN</h1>
          <p className="text-white text-h4 text-center border w-full"> News</p>
        </div>
        <div className="h-[100%] w-64 flex justify-center items-center">
          <p className="text-white text-center">To inform, inspire, and connect the world through journalism.</p>
        </div>
      </div>
      <HomeSections />
    </div>
  );
}
