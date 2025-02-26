import { useDispatch, useSelector } from "react-redux";
import Homelayout from "../../Layouts/Homelayout.jsx";
import { Chart as ChartJS,ArcElement,Tooltip, Legend,CategoryScale,LinearScale,BarElement,Title} from "chart.js"
import {FaUsers} from "react-icons/fa";
import {Bar, Pie} from "react-chartjs-2"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GetStats } from "../../Redux/Slices/StatSlice.js";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice.js";
import { GetAllCourses, removeCourseMethod } from "../../Redux/Slices/CourseSlices.js";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";


ChartJS.register(ArcElement,Tooltip, Legend,CategoryScale,LinearScale,BarElement,Title);

function Dashboard() {

   const dispatch=useDispatch();
   const navigate=useNavigate();

    const {allUserCount,subscribedCount}=useSelector(state=>state?.stat)
    const myCourse=useSelector(state=>state?.course?.coursedata)
   
  const months = ["Januar","February","March","April","May","June","July","August","September","October","November","December"]
  
const MonthlySells = {
  labels: months,
  datasets: [{
    label: 'Sales Data',
    data: [65, 59, 80, 81, 56, 55, 40,59, 80, 81, 56, 55],
    backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'
    ],
    borderColor: ['rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

const UserDetails = {
  labels: ["Registered User","Enrolled User"],
  datasets: [{
    label: 'User details',
    data: [allUserCount, subscribedCount],
    backgroundColor: [
      "red",
      "blue",
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
    ],
    borderWidth: 1
  }]
};
   
    async function DeleteCourse(courseId) {
       if (window.confirm("Do you realy want to delete this course")) {
         const res=await dispatch(removeCourseMethod(courseId))
         if (res?.payload?.success) {
            dispatch(GetAllCourses())
         }
       }
    }

    async function downloadData() {
      await dispatch(GetAllCourses())
      await dispatch(GetStats())
      await dispatch(getPaymentRecord())
   }

   useEffect(()=>{
       downloadData()
   },[])

 
  return (
    <Homelayout>
          <div className="min-h-[90vh] pt-20 flex flex-col flex-wrap gap-10 text-black">
              <center><h1 className="text-teal-500 text-5xl font-bold">Admin Dashboard</h1></center> 
          <div className="grid grid-cols-2 gap-5 m-auto mx-10">
             <div className="flex flex-col items-center bg-blue-100 gap-10 p-5 shadow-lg rounded-md"> 
                 <div className="h-80 w-80">
                    <Pie data={UserDetails}/>
                 </div>
                 <div className="grid grid-cols-2 gap-5">
                   <div className="flex items-center justify-between p-5 rounded-md shadow-md"> 
                       <div className=" flex flex-col items-center ">
                          <p className="font-semibold "> Registered users</p>
                          <h3 className="text-4xl font-bold ">{allUserCount}</h3>
                       </div>
                       < FaUsers className="text-teal-500 text-5xl" />
                   </div>
                   <div className="flex items-center justify-between p-5 rounded-md shadow-md"> 
                       <div className=" flex flex-col items-center ">
                          <p className="font-semibold ">Enrolled Users</p>
                          <h3 className="text-4xl font-bold ">{subscribedCount}</h3>
                       </div>
                       < FaUsers className="text-teal-500 text-5xl" />
                   </div>
  
                 </div>
             </div>
             <div className="flex flex-col items-center bg-blue-100 gap-10 p-5 shadow-lg rounded-md"> 
                 <div className="h-96 w-full">
                    <Bar data={MonthlySells}/>
                 </div>
             </div>

             <table className="table my-20 text-white overflow-x-scroll" >
                 <thead>
                    <tr className="text-center">
                       <th>S. No.</th>
                       <th>Course Title</th>
                       <th>Course Category</th>
                       <th>Instructor</th>
                       <th>Total Lectures</th>
                       <th>Description</th>
                       <th>Actions</th>
                    </tr>
                 </thead>
                 <tbody>
                    {
                      myCourse?.map((course,idx)=>{
                         return(
                            <tr key={idx}>
                               <td>{idx+1}</td>
                               <td><textarea value={course?.title} readOnly className=" h-auto text-center resize-none bg-transparent" cols="30" ></textarea>
                               </td>
                               <td><textarea value={course?.category} readOnly className="text-center resize-none bg-transparent" cols="30" ></textarea>
                               </td>
                               <td><textarea value={course?.createdBy} readOnly className="text-center resize-none bg-transparent" cols="20" ></textarea>
                               </td>
                               <td><textarea value={course?.numbersOfLecture} readOnly className="text-center resize-none bg-transparent" cols="20" rows="2"></textarea>
                               </td>
                               <td><textarea value={course?.description} readOnly className="text-center resize-none h-auto bg-transparent" cols="30" ></textarea>
                               </td>
                               <td className="flex w-44 ml-10  justify-between items-center gap-6">
                                   <button 
                                     className="btn btn-success "
                                     onClick={()=>{navigate(`/course/${course?._id}/displaylectures`,{state :{...course}})}}
                                     >
                                      <BsCollectionPlayFill/> 
                                   </button>
                                   <button 
                                     className="btn btn-warning "
                                     onClick={()=>{DeleteCourse(course?._id)}}
                                     >
                                      <BsTrash/> 
                                   </button>
                               </td>
                            </tr>
                         )
                      })
                    }
                 </tbody>
             </table>
          </div>
          </div>

    </Homelayout>
  )
}

export default Dashboard