import React, { useState } from "react";

import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const CarouselContainer = ({ images }) => {
  const slides = [
    {
      url: 'https://res.cloudinary.com/papasmatt/image/upload/v1684198917/Carousel/_MG_8489_mfsckj.jpg',
    },
    {
      url: 'https://res.cloudinary.com/papasmatt/image/upload/v1684198917/Carousel/_MG_8439_rftemn.jpg',
    },
    {
      url: 'https://res.cloudinary.com/papasmatt/image/upload/v1684198917/Carousel/_MG_8424_ygj4oo.jpg',
    },

    {
      url: 'https://res.cloudinary.com/papasmatt/image/upload/v1684198917/Carousel/_MG_8489_mfsckj.jpg',
    },
    {
      url: 'https://res.cloudinary.com/papasmatt/image/upload/v1684198917/Carousel/_MG_8489_mfsckj.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[3020px] h-[640px] w-full m-auto py-16 xl:py-4 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselContainer;
