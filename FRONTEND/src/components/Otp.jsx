import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { ImCross } from "react-icons/im";
import gif7 from "../assets/Images/gif7.gif"
import { Link } from 'react-router-dom';

function Otp({length=6,email,emailVerified,setshowVerificationPage}) {
  const ref=useRef(new Array(length).fill(''))
  const [optFields, setOtpFields] = useState(new Array(length).fill(''));
  let generatedOtp=useRef("");

  function handleChange(e) {
     return;
  }
  function handleResendOtp() {
    generatedOtp.current=Math.floor(100000 + Math.random() * 900000).toString();
    if(!email)return;
    const data={
       email:email,
       otp:generatedOtp
    }
    // const response=await axiosInstance.post('/email/send',data)
    // if(!response)return;
    toast.success("OTP is resended successfully")
  }
  function handleKeyDown(e,index) {
      if(e.key==="Backspace"){
        const copyOtpFields=[...optFields];
        copyOtpFields[index]='';
        setOtpFields([...copyOtpFields]);
        if(index>0) ref.current[index-1].focus();
        return;
      }
      if(e.key==='ArrowRight'){
        if(index+1<optFields.length) ref.current[index+1].focus();
      }
      if(e.key==='ArrowLeft'){
        if(index>0) ref.current[index-1].focus();
      }
      if(isNaN(e.key))return;
      const copyOtpFields=[...optFields];
      copyOtpFields[index]=e.key;
      setOtpFields([...copyOtpFields]);
      if(index+1<optFields.length) ref.current[index+1].focus();
  }

  function handleVerifyOtp() {
      if(generatedOtp.current.toString()!==optFields.join('').toString()){
         toast.error("Please enter a correct otp");
         return;
      }
      toast.success("Email is verified successfully")
      localStorage.setItem("emailVerified",true);
      emailVerified.current=true;
      setshowVerificationPage(false);
  }

  async function handleSendOtp() {
    generatedOtp.current=Math.floor(100000 + Math.random() * 900000).toString();
    if(!email)return;
    const data={
       email:email,
       otp:generatedOtp
    }
     const response=await axiosInstance.post('/email/send',data)
     if(!response)return;
    toast.success("OTP is sended successfully")
}
  useEffect(() => {
    handleSendOtp();
  }, [])
  
  
  return (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 relative h-[60%] gap-5 bg-white flex flex-col items-center rounded-lg shadow-lg p-6">
            <span
              className='absolute top-2 right-2  text-black font-bold '
              onClick={()=>setshowVerificationPage(false)} 
              >
                <ImCross size={20} />
            </span>
            <div className="flex items-center h-12 space-x-4">
                <Link href="" className="text-2xl font-extrabold hover:text-teal-400 transition">
                    Code-Scorer
                </Link>
                <img
                    src={gif7}
                    alt="Code-Scorer Animation"
                    className="h-12 w-12" // Adjust height and width as needed
                />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ">Please Check Your Email</h3>
            <p className=" text-gray-600">
               We have sent you a otp to {email}
            </p>
            <div className='flex gap-4'>
              {
                optFields.map((field,index)=>{
                  return (
                    <input 
                      onKeyDown={(e)=>handleKeyDown(e,index)}
                      key={index}
                      type="text" 
                      onChange={handleChange}
                      ref={(ele)=>ref.current[index]=ele}
                      value={optFields[index]}
                      className='w-10 h-10 rounded-lg border-2 text-3xl font-bold text-center bg-white border-black text-black ' 
                      />
                  )
                })
              }
            </div>
            <button 
              type="button"
              onClick={handleVerifyOtp}
              disabled={optFields.join('').toString().length!==length}
              className='w-[50%] disabled:bg-gray-400 disabled:text-black text-2xl font-bold  btn btn-primary'
             >
              Verify
            </button>
            <p className='font-medium text-gray-700 '>
              Didn't receive an email ? 
              <span 
              className='ml-2 cursor-pointer text-black text-xl font-bold'
              onClick={handleResendOtp}
              >
                Resend
              </span>
            </p>
            
          </div>
        </div>  
  )
}

export default Otp;