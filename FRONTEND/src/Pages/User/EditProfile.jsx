import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Homelayout from "../../Layouts/Homelayout.jsx"
import { useState } from "react"
import { BsPersonCircle } from "react-icons/bs"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GetUserProfile, updateProfile } from "../../Redux/Slices/AuthSlices.js"



function EditProfile() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const [data, setData] = useState({
      previewImage:"",
      fullName:"",
      avatar:undefined,
  })
  

 function handelImage(e) {
   e.preventDefault()
   const uploadImage=e.target.files[0]

   if (uploadImage) {
      const filerider=new FileReader()
      filerider.readAsDataURL(uploadImage)
      filerider.addEventListener("load",function(){
           setData({
              ...data,
              previewImage:this.result,
              avatar:uploadImage
           })
      })
   }
  
 }

 function handleFormData(e) {
    const{name,value}=e.target
    setData({
       ...data,
       [name]:value
    })
 }

 async function onFormSubmit(e) {
    e.preventDefault()
   if (  !data.fullName || !data.avatar ) {
      toast.error("Every field is required")
      return
   }
   if (fullName.length<5) {
      toast.error("fullName must be atlist 5 charactors")
   }
  await dispatch(updateProfile(data))
  await dispatch(GetUserProfile())
  navigate("/user/profile")
}

  return (
    <Homelayout>
        <div className="flex items-center justify-center h-screen">
             <form
               onSubmit={onFormSubmit}
               className="flex flex-col w-96 items-center justify-center gap-4 p-8 rounded-md text-white shadow-[0_0_10px_teal]"
             >
             <h1 className="font-semibold text-xl text-white">Edit Profile</h1>
             <div>
             <label className="cursor-pointer" htmlFor="upload_image">
                {data.previewImage?(
                   <div>
                      <img  
                       className="h-24 w-24 rounded-full hover:scale-125"
                       src={data.previewImage} 
                       />
                   </div>
                ):( 
                   <BsPersonCircle className="h-24 w-24 rounded-full hover:scale-125 transition duration-1000 ease-in-out"/>
                )}
             </label>
             <input
              type="file"
              className="hidden"
              id="upload_image"
              onChange={handelImage}
              name="upload_image"
              accept=".jpg .svg .png .jpeg"
              />
             </div>
              <div>
                <label htmlFor="fullName">Name :</label>
                <input
                   type="text"
                   id="fullName"
                   className="mx-4 px-6 py-1 rounded-md bg-transparent border"  
                   placeholder="Enter your name...."
                   required
                   onChange={handleFormData}
                   value={data.fullName}
                   name="fullName"
                   />
              </div>
              <button className="bg-teal-500 block w-full px-2 py-1 border rounded hover:bg-teal-600 text-white hover:text-black transition-all hover:scale-110 ease-in-out duration-300">Submit</button>

              <Link
               className="w-full"
               to={"/user/profile"}> 
               <p className="  flex items-center justify-center gap-2 w-full px-2 py-1  text-white hover:scale-200 transition-all ease-in-out duration-300"> 
               <AiOutlineArrowLeft/> Go back to profile
               </p> 
            </Link>
             </form>

        </div>
    </Homelayout>
  )

}
export default EditProfile