import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../Redux/Slices/AuthSlices.js";
import Homelayout from "../../Layouts/Homelayout.jsx";
import { Link } from "react-router-dom";
import { cancelSubscribe } from "../../Redux/Slices/RazorpaySlice.js";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);
  async function DownloadData() {
    await dispatch(GetUserProfile());
  }
  const cancelSubscribemethod= async function () {
    await dispatch(cancelSubscribe())
    DownloadData()
  }
  useEffect(() => {
    DownloadData();
  }, []);

  return (
    <Homelayout>
      <div className="min-w-[90vw] pt-20 flex  items-center justify-center">
        <div className="my-10 flex flex-col items-center w-[30vw] gap-4 rounded-lg p-4 overflow-hidden text-white shadow-[0_0_10px_teal]">
          <img
            className="w-40 h-40 border border-black rounded-full "
            src={userData?.avatar?.secure_url}
            alt="avatar"
          />
          <h3 className="text-3xl font-bold capitalize text-teal-500">
            {userData?.fullName}
          </h3>
          <div className="flex gap-5">
                 <div>
                    <p className="text-teal-500 text-xl font-semibold">Email</p>{" "}
                    <p className="text-teal-500 text-xl font-semibold">Role</p>{" "}
                    <p className="text-teal-500 text-xl font-semibold">Subscription</p>{" "}
                 </div>
                 <div>
                     <p className="text-xl">{userData?.email}</p>
                     <p className="text-xl">{userData?.role}</p>
                     <p className="text-xl">
                      {userData?.subscription?.status == "active"
                          ? "Active"
                          : "Inactive"}
                      </p>
                 </div>
          </div>
          <div className="w-full space-x-4 ">
            {/* <Link to={"/changepassword"}>
              <button className=" bg-teal-500 border px-9 py-1 transition-all ease-in-out duration-300 rounded-lg hover:bg-teal-600 text-black ">
                Change Password
              </button>
            </Link> */}
            <Link to={"/user/editprofile"}>
              <button className="w-full bg-teal-500 border px-2 py-1 transition-all ease-in-out duration-300 rounded-lg hover:bg-teal-600 text-black">
                Edit Profile
              </button>
            </Link>
          </div>
          {userData?.subscription?.status == "active" && (
            <button onClick={cancelSubscribemethod} className="w-full bg-red-500 border px-2 py-1 transition-all ease-in-out duration-300 rounded-lg hover:bg-red-600">
              {" "}
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </Homelayout>
  );
}

export default Profile;
