import { useState } from "react";
import Homelayout from "../Layouts/Homelayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Loginmethod } from "../Redux/Slices/AuthSlices.js";
import gif5 from "../assets/Images/gif5.gif";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handelformdata(e) {
    const { name, value } = e.target;
    setLoginData({
      ...LoginData,
      [name]: value,
    });
  }

  async function OnLogin(e) {
    e.preventDefault();

    if (!LoginData.email || !LoginData.password) {
      toast.error("Every field is required");
      return;
    }

    if (
      !LoginData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Please enter a valid email");
      return;
    }

    if (
      !LoginData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "Password should be 6-16 characters and have at least 1 number and 1 special character"
      );
      return;
    }

    const formData = {
      ...LoginData,
    };

    const response = await dispatch(Loginmethod(formData));
    if (response?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  }

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget.querySelector("form");
    const { clientX, clientY } = e;

    const { left, top, width, height } = card.getBoundingClientRect();
    const offsetX = clientX - left;
    const offsetY = clientY - top;

    // Normalize mouse position to get the distance from the center
    const distanceX = (offsetX / width) - 0.5; // [-0.5, 0.5]
    const distanceY = (offsetY / height) - 0.5; // [-0.5, 0.5]

    // Apply 3D transformation based on mouse position
    const rotateX = distanceY * -20; // Rotate on X-axis (top-bottom)
    const rotateY = distanceX * 20;  // Rotate on Y-axis (left-right)

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

      <div className='flex relative flex-row justify-between'>


        {/* Background GIF with reduced opacity using ::before */}
        <div
                  style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${gif5})`,
                      backgroundSize: "auto 100%", // Scales to full height, adjusts width automatically
                      backgroundPosition: "left, right", // Aligns images to the left and right
                      backgroundRepeat: "true", // Prevents tiling
                      opacity: 0.2, // Reduces opacity of the background GIF only
                      zIndex: -1, // Keeps the background behind the content
                  }}
        ></div>


        <div className=' text-6xl w-[50%] text-centre p-10 font-extrabold'>
            
            <h1 className='p-10'>We Are Always Here To Help You!</h1>

            <h3 className='text-3xl p-10 text-teal-300'>"Empowering Minds, One Lesson at a Time. Log in to Continue Your Journey."</h3>
            <h3 className='text-2xl font-extralight pl-10 text-teal-300'>"Welcome back! Education unlocks endless possibilities, empowering you to explore, grow, and achieve. Continue right where you left off and let every lesson bring you closer to your dreams. Your journey awaits—let’s begin!"</h3>


        </div>
        <div className="flex items-center  w-[50%] justify-center h-screen">

            {/* Background GIF with reduced opacity using ::before */}
        <div
                  style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${gif5})`,
                      backgroundSize: "auto 100%", // Scales to full height, adjusts width automatically
                      backgroundPosition: "left, right", // Aligns images to the left and right
                      backgroundRepeat: "true", // Prevents tiling
                      opacity: 0.6, // Reduces opacity of the background GIF only
                      zIndex: -1, // Keeps the background behind the content
                  }}
        ></div>


          <div
            className="relative h-[70%] w-[70%] bg-gray-800 border-solid-white group overflow-hidden hover:shadow-[0_0_15px_15px_teal] duration-1000 rounded-xl"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Overlay Effect */}
          {/* <div className="absolute inset-0 bg-teal-300 bg-opacity-20 transform -translate-y-full transition-transform duration-1000 ease-in-out group-hover:translate-y-0 rounded-xl"></div>*/}

            {/* Login Form */}
            <form
              noValidate
              onSubmit={OnLogin}
              className="relative flex bg-[url('../assets/Images/techno-doodle.jpg')] h-full w-full border rounded-xl p-10 gap-4 flex-col z-10 card"
              style={{
                transformStyle: "preserve-3d", // Preserve 3D transforms
                transition: "transform 0.2s ease-out", // Smooth transition for reset
              }}
            >
              <h1 className="text-4xl  text-teal-500 text-center font-bold">
                Login Now
              </h1>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter your email...."
                  name="email"
                  className="px-3 border rounded-md border-black bg-slate-300"
                  onChange={handelformdata}
                  value={LoginData.email}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  required
                  placeholder="Enter your password....."
                  name="password"
                  className="px-5 border rounded-md border-black bg-slate-300"
                  onChange={handelformdata}
                  value={LoginData.password}
                />
              </div>

              {/* Login Button with Horizontal Curtain Effect */}
              <button className="relative bg-teal-400  mt-3 py-2 text-black font-bold text-lg rounded-md overflow-hidden group hover:bg-black hover:border-solid-white hover:text-white">
                {/* Horizontal Curtain */}
                <span className="absolute inset-0 bg-teal-800 opacity-40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out"></span>
                Login
              </button>

              <p>
                Do not have an account?{" "}
                <Link className="text-teal-400 text-lg font-semibold" to={"/SignUp"}>
                  SignUp
                </Link>
              </p>
            </form>
          </div>
        </div>
        
      </div>

      
    </Homelayout>
  );
}

export default Login;

