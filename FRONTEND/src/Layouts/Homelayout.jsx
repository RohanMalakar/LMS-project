import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import Footer from "../components/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logoutmethod } from "../Redux/Slices/AuthSlices.js";
import gif7 from "../assets/Images/gif7.gif"




function Homelayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedin=useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  console.log("role",role);
  console.log("isLoggedin",isLoggedin);
  async function handlelogout(e) {
    e.preventDefault();
    const res = await dispatch(logoutmethod());
    
    if (res?.payload?.success) {
      navigate("/");
     }
  }

  useEffect(() => {
    setIsLoggedIn(isLoggedin);
  }, [isLoggedin]);
  return (
    <div className="min-w-[90vw] w-full  h-screen ">
      <header className="drawer fixed w-full bg-black  z-50 h-12">
        <ul className=" gap-10 px-10 list-none w-full flex justify-between items-center">
          <div className="flex items-center h-12 space-x-4">
              <Link href="#home" className="text-2xl font-extrabold hover:text-teal-400 transition">
                  Code-Scorer
              </Link>
              <img
                  src={gif7}
                  alt="Code-Scorer Animation"
                  className="h-12 w-12" // Adjust height and width as needed
              />
          </div>
          <li>
              <Link to={"/"}>
                <span className="text-lg font-bold hover:text-teal-300 ">Home</span>
              </Link>
          </li>
          <li>
              <Link to={"/about"}>
                <span className="text-lg font-bold hover:text-teal-300 ">About</span>
              </Link>
          </li>
          {isLoggedIn && (
              <li>
                <Link to={"/chat/community"}>
                  <span className="text-lg font-bold hover:text-teal-300  ">Community Chat</span>
                </Link>
              </li>
          )}
          {isLoggedIn && role == "ADMIN" && (
              <li>
                <Link to={"/admin/dashboard"}>
                  <span className="text-lg font-bold hover:text-teal-300  ">Admin Dashboard</span>
                </Link>
              </li>
           )}
           {isLoggedIn && role == "ADMIN" && (
              <li>
                <Link to={"/course/create"}>
                  <span className="text-lg font-bold hover:text-teal-300 ">Create course</span>
                </Link>
              </li>
            )}
            { role!="ADMIN" &&(
              <li>
                <Link to={"/contact"}>
                  <span className="text-lg font-bold hover:text-teal-300  ">Contact</span>
                </Link>
              </li>
            )}
            {isLoggedIn && role == "ADMIN" && (
              <li>
                <Link to={"/contact/showData"}>
                  <span className="text-lg font-bold hover:text-teal-300  ">Contact data</span>
                </Link>
              </li>
            )}
          {isLoggedIn ? (
            <div className="absolute right-10 gap-6 flex">
                <li>
                    <Link to={"/user/profile"}>
                      <span className="btn btn-sm border-transparent btn-primary bg-teal-300 ">
                        Profile
                      </span>
                    </Link>
                 </li>
                <li>
                  <Link onClick={handlelogout}>
                    <span className="btn btn-sm  btn-secondary border-transparent bg-teal-300">
                      Logout
                    </span>
                  </Link>
                </li>
             </div>
            ):
            (<div className="absolute right-10 gap-6 flex">
                <li>
                  <Link to={"/login"}>
                    <span className="btn btn-sm btn-primary bg-teal-300">
                      Login
                    </span>
                  </Link>
                </li>
                <li>
                <Link to={"/signup"}>
                  <span className="btn btn-sm btn-primary bg-teal-300">
                    Signup
                  </span>
                </Link>
                </li>
              </div>)
            }
        </ul>
      </header>
      {children}
      <Footer />
    </div>
  );
}

export default Homelayout;
