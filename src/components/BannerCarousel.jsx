import { useState, useEffect } from 'react';
import banner from '../assets/banner/banner.jpg';
import banner4 from '../assets/banner/banner4.jpg';
import banner5 from '../assets/banner/banner5.jpg';

const images = [banner, banner4, banner5];

const BannerCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[300px] relative overflow-hidden rounded-lg shadow-lg">
      <img
        src={images[index]}
        alt={`Banner ${index + 1}`}
        className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
      />

      {/* Dot Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-4 h-4 rounded-full border border-white cursor-pointer transition-all duration-300 ${
              i === index ? 'bg-white scale-110' : 'bg-gray-400 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
