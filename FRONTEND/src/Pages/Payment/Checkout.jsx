import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRazorpayId,
  purchaseCourse,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice.js";
import toast from "react-hot-toast";
import Homelayout from "../../Layouts/Homelayout.jsx";
import { BiRupee } from "react-icons/bi";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const razorPayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );
  const userData = useSelector((state) => state?.auth?.data);
  const isPaymentVerified = useSelector(
    (state) => state?.razorpay?.isPaymentVerified
  );
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_signature: "",
    razorpay_subscription_id: "",
  };

  const loadData = async function () {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourse());
  };

 
  const handleSubscription = async (event) => {
    event.preventDefault();

   
    if (!razorPayKey || !subscription_id) {
      return;
    }

    const options = {
      key: razorPayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Monthly Subscription",
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        toast.success("Payment Successfull");

        const res= await dispatch(verifyUserPayment(paymentDetails));

         res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
      prefill: {
        name: userData.fullName,
        email: userData.email,
      },
      theme: {
        color: "#F37254",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
     <Homelayout>
         <form 
          onSubmit={handleSubscription}
          className="min-h-[90vh] flex pt-20 items-center justify-center text-white"
           >
            <div className="w-80 overflow-hidden h-[26rem] flex items-center rounded-lg relative flex-col justify-center shadow-[0_0_10px_yellow]">
               <h1 className="bg-yellow-500 text-2xl p-5 text-center font-bold w-full absolute top-0">Subscription bundle
               </h1>
               <div className="px-4 space-y-4 text-center">
                  <p className="text-[17px] ">
                     This purchase allow you to access all available course 
                     of our platform for {" "}
                     <span className="text-yellow-500 font-bold">
                        <br /> 
                       1 year duration {" "}
                     </span>
                     All the existing and new launched courses will be also available
                  </p>
                  <p className="flex items-center gap-1 text-2xl font-bold text-yellow-500 justify-center">
                     <BiRupee/> <span>499 </span> only
                  </p>
                  <div className="text-gray-400">
                     <p>100% refund on cancellation</p>
                     <p>* Terms and condition applied *</p>
                  </div>
  
                <button className="text-xl font-bold text- p-2   mt-6  hover:bg-yellow-600 transition-all absolute bottom-0 w-full left-0 ease-in-out duration-200 bg-yellow-500" type="submit"> Buy Now</button>
               </div>
            </div>
 
         </form>
     </Homelayout>
  );
}

export default Checkout;
