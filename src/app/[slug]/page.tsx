// pages/NewsPage.tsx
import Link from "next/link";
import React from "react";

interface NewsItem {
  id: number;
  title: string;
  image: string;
  date: string;
  summary: string;
  category: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Political Landscape in 2024: Key Changes",
    image: "https://images.pexels.com/photos/592552/pexels-photo-592552.jpeg",
    date: "Nov 1, 2024",
    summary: "An overview of major shifts in the political landscape as we approach 2024 An overview of major shifts in the political landscape as we approach 2024 An overview of major shifts in the political landscape as we approach 2024...",
    category: "Politics",
  },
  {
    id: 2,
    title: "Election Insights and Voter Turnout",
    image: "https://images.pexels.com/photos/592552/pexels-photo-592552.jpeg",
    date: "Oct 28, 2024",
    summary: "Voter turnout has become a critical focus this election season An overview of major shifts in the political landscape as we approach 2024An overview of major shifts in the political landscape as we approach 2024 ...",
    category: "Politics",
  },
  {
    id: 3,
    title: "Debates Shape the Future of Legislation",
    image: "https://images.pexels.com/photos/592552/pexels-photo-592552.jpeg",
    date: "Oct 25, 2024",
    summary: "Debates over critical policies continue to shape the future An overview of major shifts in the political landscape as we approach 2024An overview of major shifts in the political landscape as we approach 2024...",
    category: "Politics",
  },
  // Add more articles as needed
];

interface NewsPageProps {
    params: any
  }

const NewsPage: React.FC<NewsPageProps> = ({params}) => {
  const [featuredNews, ...otherNews] = newsData;
const { slug } = params;
  return (
    <div className="bg-gray-100 p-6">
      {/* <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Political News</h1> */}
      
      {/* Featured News */}
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="relative">
          <img
            src={featuredNews.image}
            alt={featuredNews.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6 w-full text-white">
            <h2 className="text-3xl font-bold">{featuredNews.title}</h2>
            <p className="text-sm mt-2">{featuredNews.date}</p>
            <p className="mt-4">{featuredNews.summary}</p>
          </div>
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-lg">
            {slug.toUpperCase()}
          </span>
        </div>
      </div>
      
      {/* Other News */}
      <div className=" grid grid-cols-1 place-content-center md:grid-cols-1 gap-6">
        {otherNews.map((news) => (
          <Link
          href={`/${slug}/details`}
            key={news.id}
            className="group w-[70%] m-auto flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="w-1/3 relative overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-lg">
                {news.category}
              </span> */}
            </div>
            <div className="p-4 w-2/3">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-red-500 transition duration-300">
                {news.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{news.date}</p>
              <p className="text-gray-700 mt-3">{news.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>

      </div>
    </div>
  );
};

export default NewsPage;
