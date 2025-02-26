import React, { useState, useEffect } from 'react';
import prafulasir from '../assets/Images/prafulasir.png';
import jigyasamaam from '../assets/Images/jigyasamaam.png';
import brajraj from '../assets/Images/brajraj.png';
import rohan from '../assets/Images/rohan.jpg';
import manishsir from '../assets/Images/manishsir.png';
import dheerajsir from '../assets/Images/dheerajsir.jpg';
import deveshsir from '../assets/Images/deveshsir.png';
import rohitsir from '../assets/Images/rohitsir.jpg';
import khushboomaam from '../assets/Images/khushboomaam.jpg';

const Carousel = () => {
    const slides = [deveshsir, manishsir];
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoSlideInterval = 3000; // Auto-slide interval in ms

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, autoSlideInterval);
        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => setCurrentIndex(index);
    const prevSlide = () => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    const nextSlide = () => setCurrentIndex((currentIndex + 1) % slides.length);

    return (
        <div className="relative rounded-full w-full h-[80vh] flex" data-carousel="static">
            {/* Left Half: Carousel Wrapper */}
            <div className="relative w-1/3 h-full border-solid rounded-lg">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute transition-opacity duration-1000  overflow-hidden ease-in-out h-[100%] w-[100%] rounded-3xl top-0 left-0 object-cover ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={slide}
                            className="block w-full h-full object-cover"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}

                {/* Indicators */}
                <div className="absolute z-30 flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-teal-300' : 'bg-black'}`}
                            aria-current={index === currentIndex}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>

                {/* Controls */}
                <button
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={prevSlide}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={nextSlide}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            {/* Right Half: Text Div */}
            <div className="w-2/3 h-full flex flex-col bg-gray-800 items-center justify-center ">
                <h1 className='text-6xl font-extrabold text-teal-300 '>Our Faculty </h1>
                <h2 className="text-2xl p-20 from-accent-content">Faculties are dedicated, knowledgeable, and passionate, bringing expertise and real-world experience to the classroom. They inspire curiosity, foster critical thinking, and provide personalized support, empowering students to achieve academic success and grow in confidence.</h2>
            </div>
        </div>
    );
};

export default Carousel;
