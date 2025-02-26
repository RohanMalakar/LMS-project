import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { CreateNewCourse } from "../../Redux/Slices/CourseSlices.js"
import Homelayout from "../../Layouts/Homelayout.jsx"
import { AiOutlineArrowLeft } from "react-icons/ai";




function CreateCourse() {
   const dispatch=useDispatch()
   const navigate =useNavigate()
 

const [inputData,setInputData]=useState({
       title:"",
       description:"",
       category:"",
       createdBy:"",
       thumbnail:"",
       previewImage:"",
   })
   
   
function handleImageUpload (e) {
      e.preventDefault()
      const uploadedImage=e.target.files[0]
      if (uploadedImage) {
         const fileReader= new FileReader()
         fileReader.readAsDataURL(uploadedImage)
         fileReader.addEventListener("load",function () {
          setInputData({
             ...inputData,
             previewImage:this.result,
             thumbnail:uploadedImage
          }) 
         })
      }
   }
function handleInput(e) {
      const {name,value}=e.target
      setInputData({
        ...inputData,
        [name]:value
      })
   }

 async function onFormSubmit(e) {
  e.preventDefault()
  
  if (!inputData.category || !inputData.createdBy || !inputData.description  ||  !inputData.title || !inputData.thumbnail )  {
     toast.error("Every field is required")
  }

const formData=new FormData()

formData.append("title",inputData.title)
formData.append("description",inputData.description)
formData.append("category",inputData.category)
formData.append("createdBy",inputData.createdBy)
formData.append("thumbnail",inputData.thumbnail)


  const response= await dispatch(CreateNewCourse(formData))
  if (response?.payload) {
     setInputData({
      title:"",
      description:"",
      category:"",
      createdBy:"",
      thumbnail:"",
      previewImage:"",
     })
     navigate("/courses")
  }
}

  return (
    <Homelayout>
       <div className="h-screen flex items-center justify-center">
       <form 
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_teal] relative "
          onSubmit={onFormSubmit}
       >
           <span onClick={()=>{navigate("/courses")}} className="absolute top-8 text-3xl link text-accent cursor-pointer">
              <AiOutlineArrowLeft />
           </span>
           <h1 className="text-center font-bold text-2xl">Create new Course</h1> 
           <main className="grid grid-cols-2 gap-x-10 ">
              <div className="space-y-6">
                 <div className="border rounded-lg overflow-hidden">
                      <label htmlFor="image_uploads" className="cursor-pointer"> 
                       {  inputData.previewImage ? (
                          <img 
                            src={inputData.previewImage}
                            alt="previewImage" 
                            className="w-full h-44 m-auto border  "
                          />
                       ) :(
                          <div  className="w-full h-44 m-auto flex items-center justify-center border">
                              <h1 className="font-bold text-lg "> Upload your course thumbnail </h1>
                          </div>
                       )
                       }
                      </label>
                      <input
                        onChange={handleImageUpload}
                        className="hidden " 
                        type="file"
                        id="image_uploads"
                        accept=".jpg .png .jpeg"
                        name="image_uploads"
                      />
                        
                 </div>
                 <div className="flex flex-col gap-1">
                      <label htmlFor="title" className="text-lg font-semibold">
                         Course title 
                      </label>
                      <input
                       type="text" 
                       className="bg-transparent px-2 py-1 border rounded-lg"
                       required
                       name="title"
                       id="title"
                       value={inputData.title}
                       onChange={handleInput}
                     />
                 </div>
              </div>
              <div className="flex flex-col gap-4">
              
                 <div className="flex flex-col gap-1">
                      <label htmlFor="category" className="text-lg font-semibold">
                         Course category 
                      </label>
                      <input
                       type="text" 
                       className="bg-transparent px-2 py-1 border rounded-lg"
                       required
                       name="category"
                       id="category"
                       value={inputData.category}
                       onChange={handleInput}
                     />
                 </div>
                 <div className="flex flex-col gap-1">
                      <label htmlFor="createdBy" className="text-lg font-semibold">
                         createdBy 
                      </label>
                      <input
                       type="text" 
                       className="bg-transparent px-2 py-1 border rounded-lg"
                       required
                       name="createdBy"
                       id="createdBy"
                       value={inputData.createdBy}
                       onChange={handleInput}
                     />
                 </div>
                 <div className="flex flex-col gap-1 ">
                      <label htmlFor="description" className="text-lg font-semibold">
                         Course description 
                      </label>
                      <textarea
                       type="text" 
                       className="bg-transparent h-24 overflow-y-scroll resize-none px-2 py-1 border "
                       required
                       name="description"
                       id="description"
                       value={inputData.description}
                       onChange={handleInput}
                       
                     />
                 </div>
              </div>
           </main>
           <button  className="w-full bg-teal-600 border text-2xl rounded-md py-2 hover:bg-teal-500 font-extrabold text-white hover:text-black transition-all ease-out duration-300" onSubmit={onFormSubmit}>Create Course </button>

       </form>
       </div>
    </Homelayout>
  )
}

export default CreateCourse