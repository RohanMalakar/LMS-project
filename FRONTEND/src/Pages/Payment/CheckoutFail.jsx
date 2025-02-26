
import React from "react";
import Homelayout from "../../Layouts/Homelayout.jsx";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

const CheckoutFail = () => {
  return (
    <Homelayout>
      <div className="min-h-[90vh] pt-20 flex items-center justify-center text-white">
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-red-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment failed
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <p className="text-center">
              <h2 className="text-lg font-semibold">
                Oops! Your Payment Failed
              </h2>
              Please try it again as it can be a temporary issue.
            </p>

            <RxCrossCircled className="text-5xl text-red-500" />

            <p>Failed</p>
          </div>

          <Link
            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
            to={"/checkout"}
          >
            <button>Revisit Payment</button>
          </Link>
        </div>
      </div>
    </Homelayout>
  );
};

export default CheckoutFail;