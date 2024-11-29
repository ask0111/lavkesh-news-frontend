import React, { useEffect, useRef, useState } from "react";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { SlLike } from "react-icons/sl";

interface Video {
  id: number;
  src: string;
  title: string;
  description: string;
  poster?: string;
}

const videosData: Video[] = [
  {
    id: 1,
    src: "",
    poster: "https://via.placeholder.com/800x500?text=News+Video",
    title: "Breaking News: Global Events",
    description: "Stay updated with the latest global news.",
  },
  {
    id: 2,
    src: "https://www.w3schools.com/html/movie.mp4",
    poster: "https://via.placeholder.com/800x500?text=News+Video+2",
    title: "Tech Innovations in 2024",
    description: "Explore groundbreaking tech innovations.",
  },
  {
    id: 3,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://via.placeholder.com/800x500?text=News+Video+3",
    title: "Sports Highlights: Top Moments",
    description: "Catch the highlights of recent matches.",
  },
];

const VideoReels: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideo) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentVideo]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const windowHeight = container.offsetHeight;

    const newIndex = Math.round(scrollPosition / windowHeight);
    setCurrentVideo(newIndex);
  };

  const scrollToNext = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const windowHeight = container.offsetHeight;
      const newIndex = Math.min(currentVideo + 1, videosData.length - 1);

      container.scrollTo({
        top: newIndex * windowHeight,
        behavior: "smooth",
      });
      setCurrentVideo(newIndex);
    }
  };

  const scrollToPrevious = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const windowHeight = container.offsetHeight;
      const newIndex = Math.max(currentVideo - 1, 0); // Ensure we don't go below index 0
  
      container.scrollTo({
        top: newIndex * windowHeight,
        behavior: "smooth",
      });
      setCurrentVideo(newIndex);
    }
  };
  
  return (
    <div
      ref={containerRef}
      className="h-[70vh] w-96 overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      onScroll={handleScroll}
    >
      {videosData.map((video, index) => (
        <div
          key={video.id}
          className={`h-full w-full snap-start relative flex items-center justify-center bg-black group ${
            index === currentVideo ? "fade-in" : "fade-out"
          }`}
        >
          {/* Video */}
          { !video.src.includes('.mp4') ? <iframe width="560" height="315" src="https://www.youtube.com/embed/L1o7ToGkr18?si=ZOuGjFX_t-zbWJpz" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" aria-controls="play" ></iframe>
           :
           <video
             ref={(el: any) => (videoRefs.current[index] = el)}
             src={video.src}
             poster={video.poster}
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
             muted
             loop
           ></video>
           
          }


          {/* Black Overlay on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          {/* Text Overlay */}
          <div className="absolute  bottom-20 left-8 text-white space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <h2 className="text-3xl font-bold">{video.title}</h2>
            <p className="text-lg">{video.description}</p>
          </div>

          {/* Top Action Buttons */}
          <div className="absolute flex flex-col items-end gap-4 bottom-1/2 right-2 space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className=" text-white">
           <SlLike size={24} /> 
            </button>
            <button className="text-white">
              <FaShare size={24} />
            </button>
          </div>

          { index > 0 && (
            <button
              onClick={scrollToPrevious}
              className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-transparent border text-white space-x-4 opacity-0 group-hover:opacity-100 transition-opacity px-6 py-2 rounded-full shadow-md"
            >
               <BiArrowToTop />
            </button>
          )}
          {index === currentVideo && index < videosData.length - 1 && (
            <button
              onClick={scrollToNext}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-transparent border text-white space-x-4 opacity-0 group-hover:opacity-100 transition-opacity px-6 py-2 rounded-full shadow-md"
            >
              <BiArrowFromTop />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoReels;
