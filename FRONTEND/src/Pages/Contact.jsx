import { useState } from "react";
import Homelayout from "../Layouts/Homelayout.jsx";
import toast from "react-hot-toast";
import axiosInstance from "../Hellers/axiosinstance.js";

function Contact() {
  const [inputText, setInputText] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handelformdata = function (e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInputText({
      ...inputText,
      [name]: value,
    });
  };

  async function onsubmitform(e) {
    e.preventDefault();
    
    if (!inputText.email || !inputText.name || !inputText.message) {
      toast.error("Every field is required");
      return;
    }

    if (
      !inputText.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const response = axiosInstance.post("data/contact", inputText);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Your message sent successfully",
        error: "Failed to submit your form",
      });

      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setInputText({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget.querySelector("form");
    const { clientX, clientY } = e;

    const { left, top, width, height } = card.getBoundingClientRect();
    const offsetX = clientX - left;
    const offsetY = clientY - top;

    // Normalize mouse position to get the distance from the center
    const distanceX = offsetX / width - 0.5; // [-0.5, 0.5]
    const distanceY = offsetY / height - 0.5; // [-0.5, 0.5]

    // Apply 3D transformation based on mouse position
    const rotateX = distanceY * -20; // Rotate on X-axis (top-bottom)
    const rotateY = distanceX * 20; // Rotate on Y-axis (left-right)

    // Apply the transformation
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  // Reset transformation when mouse leaves
  const handleMouseLeave = () => {
    const card = document.querySelector(".card");
    card.style.transform = "rotateX(0) rotateY(0)"; // Reset transform on leave
  };

  return (
    <Homelayout>
      <div className="flex flex-row p-20 justify-between">
        <div className="flex w-[50%] h-[100%] justify-center ">
          <div
            className="relative w-[60%] h-[70%]  bg-gray-800 border-solid-white group hover:shadow-[0_0_15px_15px_teal] overflow-hidden duration-1000 rounded-xl"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Overlay Effect */}
            <div className="absolute inset-0 bg-teal-500 bg-opacity-20 transform -translate-y-full transition-transform duration-1000 ease-in-out group-hover:translate-y-0 rounded-xl"></div>

            {/* Contact Form */}
            <form
              noValidate
              onSubmit={onsubmitform}
              className="relative flex bg-[url('../assets/Images/techno-doodle.jpg')] bg-cover bg-center w-full h-full border rounded-xl p-10 gap-4 flex-col z-10 card"
              style={{
                transformStyle: "preserve-3d", // Preserve 3D transforms
                transition: "transform 0.2s ease-out", // Smooth transition for reset
                minHeight: "400px", // Ensure enough space for the form
              }}
            >
              <h1 className="text-4xl text-teal-400 text-center font-bold">
                Contact Us
              </h1>

              <div className="flex  flex-col gap-2">
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Enter your name..."
                  name="name"
                  className="px-3 w-full  border rounded-md py-1 bg-transparent text-white"
                  onChange={handelformdata}
                  value={inputText.name}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter your email..."
                  name="email"
                  className="px-3 w-full  border rounded-md py-1 bg-transparent text-white"
                  onChange={handelformdata}
                  value={inputText.email}
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <label htmlFor="message">Message :</label>
                <textarea
                  id="message"
                  required
                  placeholder="Enter your message..."
                  name="message"
                  className="px-3 border w-full  rounded-md py-1 h-40 resize-none bg-transparent text-white"
                  onChange={handelformdata}
                  value={inputText.message}
                />
              </div>

              {/* Add margin-bottom to create space after the button */}
              <button
                type="submit"
                className="bg-teal-400 mt-3 py-2 text-black font-bold text-lg rounded-md mb-6"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="text-2xl w-[50%]">
          <h1 className="text-4xl font-extrabold p-10 text-teal-300">
            Get in Touch with Us
          </h1>
          <p className="font-sans text-xl font-bold pl-10 pr-10">
            At CodeScorer, we believe in creating a supportive and interactive
            learning environment for students of all ages. Whether you're
            seeking academic assistance, online tutoring, or have any questions
            about our courses, we're here to help you every step of the way!
          </p>

          <h3 className="text-2xl font-bold p-5 pl-10 pr-10 text-teal-300">
            Why Choose Us
          </h3>
          <div>
            <ul>
              <li>
                <h4 className="text-xl text-gray-300 pl-10 font-bold">
                  Expert Tutors:
                </h4>
                <p className="pl-10 text-xl font-extralight">
                  {" "}
                  Our team of experienced instructors is dedicated to providing
                  high-quality education in a variety of subjects, from
                  mathematics and science to language learning and test
                  preparation.
                </p>
              </li>
              <li>
                <h4 className="text-xl text-gray-300 pl-10 font-bold">
                  Flexible Scheduling:
                </h4>
                <p className="pl-10 text-xl font-extralight">
                  {" "}
                  We offer convenient online classes tailored to your schedule.
                  Learn at your own pace, from anywhere in the world.
                </p>
              </li>
              <li>
                <h4 className="text-xl text-gray-300 pl-10 font-bold">
                  Personalized Learning:
                </h4>
                <p className="pl-10 text-xl font-extralight">
                  {" "}
                  We understand that every student learns differently. Our
                  courses are designed to cater to your unique needs and
                  learning style, ensuring the best outcomes.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Homelayout>
  );
}

export default Contact;
