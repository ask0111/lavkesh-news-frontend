// BlogPage.tsx
import React from 'react';
import Image from 'next/image';

const newsData = [
  {
    image: 'https://images.pexels.com/photos/592552/pexels-photo-592552.jpeg',
    type: 'Business',
    date: new Date('2024-11-01').toDateString(),
    title: "Top 10 Business Strategies for 2024",
    description: "Explore the most effective business strategies that will help you succeed in 2024, from scaling your operations to optimizing revenue.",
  },
  {
    image: 'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg',
    type: 'Technology',
    date: new Date('2024-10-28').toDateString(),
    title: "The Rise of Virtual Reality in Gaming",
    description: "Virtual reality is transforming gaming like never before. Discover the latest advancements and what they mean for the gaming industry.",
  },
  // Add more news items here...
];

const BlogPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">News & Insights</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((news, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative group">
              <Image
                src={news.image}
                width={400}
                height={240}
                className="w-full h-48 object-cover transition duration-300 ease-in-out group-hover:scale-105"
                alt={news.title}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out flex items-center justify-center text-white">
                <h3 className="text-lg font-semibold opacity-0 group-hover:opacity-100">{news.type}</h3>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">
                {news.type} / {news.date}
              </p>
              <h2 className="text-xl font-bold mb-2">{news.title}</h2>
              <p className="text-gray-700">{news.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
