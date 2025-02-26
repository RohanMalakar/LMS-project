import React, { useRef, useEffect } from 'react';
import Homelayout from "../Layouts/Homelayout.jsx";
import { Link } from 'react-router-dom';
import homepageImage from "../assets/Images/homePageMainImage.png";
import { useDispatch } from 'react-redux';
import { useEffect as useReduxEffect } from 'react';
import { GetUserProfile } from '../Redux/Slices/AuthSlices.js';
import TopEducator from "../Pages/TopEducator.jsx";
import StudentsReviews from "../Pages/StudentsReviews.jsx";
import SocialMedia from "../Pages/SocialMedia.jsx"; 
import Carousel from "../Pages/ImageSlider.jsx";
import { Typed } from 'react-typed';
import gif3 from "../assets/Images/gif3.gif"; // Adjust path as necessary
import Header from '../components/Header.jsx';
function Homepage() {
    const dispatch = useDispatch();

    // Load data using Redux action
    async function loaddata() {
        dispatch(GetUserProfile());
    }

    // Dispatch the profile loading on component mount
    useReduxEffect(() => {
        loaddata();
    }, []);

    const typedElement = useRef(null); // Reference for Typed

    useEffect(() => {
        if (typedElement.current) {
            // Initialize typing effect
            typedElement.current = new Typed(typedElement.current, {
                strings: [
                    "Affordable Online courses.",
                    "Industry expert's Lectures.",
                    "24 x 7 Doubt Support.",
                    "Free Personal Guidance.",
                    "Quality Mentorship.",
                    "Mental Health Support."
                ],
                typeSpeed: 50,
                backSpeed: 50,
                loop: true,
                showCursor: true, // Show the cursor while typing
                cursorChar: '|',
            });
        }
    }, []);

    return (
        <Homelayout>
            <div
                className="flex pt-20 flex-col h-[100vh] sm:flex-row items-center sm:justify-center lg:pt-7  relative"
            >
                {/* Background GIF with reduced opacity using ::before */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${gif3})`,
                        backgroundSize: "auto 100%", // Scales to full height, adjusts width automatically
                        backgroundPosition: "left, right", // Aligns images to the left and right
                        backgroundRepeat: "true", // Prevents tiling
                        opacity: 0.7, // Reduces opacity of the background GIF only
                        zIndex: -1, // Keeps the background behind the content
                    }}
                ></div>

                {/* Left Section (Text Content) */}
                <div className='pl-6 w-4/5 space-y-5'>
                    <h1 className='text-8xl pb-20  font-extrabold text-teal-300'>
                        Keep Learning, and Keep Exploring!!
                    </h1>

                    <div className="flex flex-row">
                        <h1 className='text-6xl pr-10 font-extrabold sm:text-5xl mb-4'>
                            Here You Get 
                        </h1>
                        <div
                            ref={typedElement}
                            className="text-3xl font-semibold sm:text-5xl text-teal-300 mb-4"
                        >
                            {/* Typing effect will appear here */}
                        </div>
                    </div>


                    <div className='space-x-4 pt-10 pb-10'>
                        <Link to={"/courses"}>
                            <button className='bg-teal-400 transition-all delay-100 font-bold hover:bg-white text-black p-2 rounded-md'>
                                Explore Courses
                            </button>
                        </Link>
                        <Link to={"/contact"}>
                            <button className='text-teal-400 border font-bold border-teal-400 p-2 hover:bg-teal-300 hover:text-black rounded-md'>
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Section (Image) */}
                <div className="p-0 m-0 h-[100%] w-2/5">
                    <img src={homepageImage} alt="home page image" />
                </div>
            </div>

            {/* Additional Sections */}
            <Header/>
            <Carousel />
            <TopEducator />
            <StudentsReviews />
            <SocialMedia />
        </Homelayout>
    );
}

export default Homepage;
