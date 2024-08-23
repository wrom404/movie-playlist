import React, { useEffect, useState } from "react";

const ImageCarousel = ({ movieList, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto switch to the next image every interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movieList.length);
    }, interval);

    return () => clearInterval(timer);
  }, [movieList.length, interval]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movieList.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movieList.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden h-[18rem] sm:h-[24rem] md:h-[32rem] relative">
        {movieList.map((image, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500/${image.backdrop_path}`}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1"
      >
        &lt;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1"
      >
        &gt;
      </button>

      {/* Indicators */}
      <div className="absolute max-xs:bottom-14 max-sm:bottom-8 bottom-0 left-1/2 transform -translate-x-1/2 flex gap-0 space-x-2 p-2">
        {movieList.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
