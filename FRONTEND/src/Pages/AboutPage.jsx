
import React from "react";
import Homelayout from "../Layouts/Homelayout.jsx";
import AboutImage from "../assets/Images/aboutMainImage.png";
import Slides from "../components/carouselSlides.jsx";
import { arr } from "../constants/AboutpageContants.jsx";
import gif3 from "../assets/Images/gif3.gif"; // Adjust path as necessary
import rohan from "../assets/Images/rohan.jpg"; // Adjust path as necessary
import braj from "../assets/Images/brajraj.png"; // Adjust path as necessary

function AboutPage() {
  return (
    <Homelayout>
      <div
        className="w-full  flex justify-center items-center flex-col relative"
        style={{
          backgroundImage: `url(${gif3})`,
          backgroundSize: "cover", // Ensures the image covers the entire container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents the GIF from repeating
          opacity: 0.8, // Reduces opacity of the background image only
          zIndex: -5, // Keeps the background behind the content
          height: "250vh", // Ensures the background covers the full height
        }}
      >
        {/* Content Section */}
        <div className="min-w-full flex justify-center  items-center flex-col relative z-10">
          <div className="flex sm:flex-row flex-col mt-5 items-center justify-center ">
            <div className="w-full sm:w-1/2 px-5 lg:px-16 space-y-5">
              <h1 className="text-5xl w-[100%] text-center pl-10 font-extrabold text-teal-300">
                "Affordable and quality education, that meets the expectations"
              </h1>
              <p className="text-2xl font-extralight pl-10 pt-10 text-teal-300">
                Our mission is to make quality education accessible and affordable for everyone across the globe. We aim to create a platform where aspiring teachers and eager students can connect, collaborate, and share their skills, creativity, and knowledge. By fostering this exchange, we empower individuals to grow personally and professionally. <br /> <br />
          
                Ultimately, our goal is to uplift individuals and communities by emphasizing the transformative power of education. By enabling access to knowledge and creativity, we strive to contribute to the overall growth and well-being of humanity.
              </p>
            </div>
            <div className="w-full sm:w-1/2 flex items-center">
              <img src={AboutImage} alt="about page image" />
            </div>
          </div>
          <div className="flex gap-20 mt-14">
              <section className=" border border-transparent hover:scale-110  hover:bg-gray-700 ease-in-out transition duration-1000 rounded-2xl bg-gray-900 py-10">
              <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                  About the Founder
                </h2>
                <div className="bg-gray-800 rounded-lg shadow-md p-6 md:flex items-center">
                  {/* Image Section */}
                  <div className="w-full hover:scale-110 ease-in-out transition duration-1000 md:w-1/3 mb-6 md:mb-0 flex justify-center">
                    <img
                      src={rohan} // Replace with founder's image URL
                      alt="Founder"
                      className="w-40 h-40 rounded-full object-cover"
                    />
                  </div>

                  {/* Details Section */}
                  <div className="md:w-2/3 md:ml-6">
                    <h3 className="text-2xl font-extrabold text-teal-600">Rohan Malakar</h3>
                    <p className="text-gray-300 mb-4">Founder, Code-Scorer</p>
                    <ul className="text-white space-y-2">
                      <li>
                        <strong  className="text-teal-300" >Email:</strong> rohanmalakar5091@gmal.com
                      </li>
                      <li>
                        <strong className="text-teal-300" >Mobile:</strong> +91 9098905595
                      </li>
                      <li>
                        <strong className="text-teal-300" >Office Address:</strong> MITS Gwalior, MP 474005
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className=" border border-transparent hover:scale-110 hover:bg-gray-700 ease-in-out transition duration-1000 rounded-2xl bg-gray-900 py-10">
              <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                  About the Founder
                </h2>
                <div className="bg-gray-800 rounded-lg shadow-md p-6 md:flex items-center">
                  {/* Image Section */}
                  <div className="ease-in-out hover:scale-110 transition duration-1000 md:w-1/3 md:h-1/3 mb-6 md:mb-0 flex justify-center">
                    <img
                      src={braj} // Replace with founder's image URL
                      alt="Founder"
                      className="w-40 h-40 rounded-full object-cover"
                    />
                  </div>

                  {/* Details Section */}
                  <div className="md:w-2/3 md:ml-6">
                    <h3 className="text-2xl font-extrabold text-teal-600">Brajraj Mishra</h3>
                    <p className="text-gray-300 mb-4">Founder, Code-Scorer</p>
                    <ul className="text-white space-y-2">
                      <li>
                        <strong className="text-teal-300">Email:</strong> mishrabckt2020@gmail.com
                      </li>
                      <li>
                        <strong className="text-teal-300" >Mobile:</strong> +91 8418989493
                      </li>
                      <li>
                        <strong className="text-teal-300" >Office Address:</strong> MITS Gwalior, MP 474005
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="carousel mb-6 w-[50%]">
            {arr &&
              arr.map((obj, index) => {
                return (
                  <Slides
                    {...obj}
                    slidenumber={index + 1}
                    key={index}
                    totalslides={arr.length}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Homelayout>
  );
}

export default AboutPage;
