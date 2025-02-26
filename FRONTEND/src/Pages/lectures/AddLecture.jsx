import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Homelayout from "../../Layouts/Homelayout.jsx";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { UploadLectures } from "../../Redux/Slices/LectureSlice.js";

function AddLecture() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const [previewLecture,setPreviewLecture]=useState("")
  const [formData, setFormData] = useState({
    title: "",
    lecture: undefined,
    description: "",
    courseId: state?._id,
  });
  
  async function onFormSubmit(e) {

    e.preventDefault()
    if (!formData.title || !formData.description || !formData.lecture) {
      toast.error("Every field is required");
      return;
    }
      const response= await dispatch(UploadLectures(formData));
      if(response?.payload?.success==true){
        setFormData({
          title: "",
            lecture: undefined,
            description: "",
            courseId: state?._id,
          })
          setPreviewLecture("")
          navigate(-1)
      }
  }

  function handleVideoUpload(e) {
    const file =e.target.files[0]
    
    if (file) {
          const source=window.URL.createObjectURL(file)
          setFormData({
            ...formData,
            lecture:file
          })
          setPreviewLecture(source)
    }
  }


  function handleData(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    if (!state) navigate("/courses")
  }, []);
  return (
    <Homelayout>
      <div className="min-h-[90vh] pt-20 flex items-center flex-col justify-center">
        <div className="flex flex-col border px-4 py-5 items-center gap-3 justify-center">

          <header className=" relative w-full flex items-center justify-center">
            <button onClick={()=>{ navigate(-1)}} className="absolute text-2xl text-yellow-600 left-1">
               <AiOutlineArrowLeft/>
            </button>
            <h1 className="text-2xl text-yellow-500">Add Lecture</h1>
          </header>
          <form
          onSubmit={onFormSubmit}
          className="space-y-8 relative  p-10 resize-nonex px-4 py-3 flex flex-col justify-center items-center "
        >
          <div className="w-72 h-48 flex border items-center justify-center">
            <label className="w-full h-full flex items-center justify-center" htmlFor="lecturevideo">
           { previewLecture
              ?(<video 
                muted
                src={previewLecture}
                controls
                disablePictureInPicture
                controlsList="nodownload nofullscreen"
                className="object-fill rounded-tl-md rounded-tr-md w-full"
                >
                
              </video>)
               :<h1>Upload your video</h1>
              }
            </label>
            <input 
              name="lecture"
              onChange={handleVideoUpload}
              className="hidden" 
              id="lecturevideo" 
              type="file"
              accept="video/mp4 video/x-mp4" 
              />
          </div>
       
             <div className="flex w-full flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="bg-transparent h-24 overflow-y-scroll resize-none px-2 py-1 border" 
                name="description" 
                id="description" 
                cols="30" 
                rows="6"
                value={formData.description}
                onChange={handleData}
                type="text"
               >
              </textarea>
             </div>
             <div className="w-full flex flex-col gap-2">
              
              <input
                className="bg-transparent overflow-y-scroll resize-none px-2 py-1 border" 
                name="title" 
                id="title" 
                type="text"
                value={formData.title}
                onChange={handleData}
                placeholder="Add lecture Title"
               >
              </input>
           
          </div>
          </form>
          <button onClick={onFormSubmit} className="text-center  px-7  btn btn-secondary">Submit</button>
        </div>
      </div>
    </Homelayout>
  );
}

export default AddLecture;
