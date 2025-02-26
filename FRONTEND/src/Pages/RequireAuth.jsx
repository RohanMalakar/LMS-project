import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { GetUserProfile } from "../Redux/Slices/AuthSlices.js"
import { useEffect } from "react"


// THIS COMPONENT IS REQUIRED US TO AUTHANTICATE THE USER IS ADMIN OR OTHER IF ADMIN THAN WE EXICUTE THE OUTLATE COMPONENT WHICH EXICUTE THE COMPONET WHICH IS PASSED BY US IN ROUTING 



function RequireAuth({allowedRoles}) {
  const {role,isLoggedIn}=useSelector( state => state.auth)
  const dispatch=useDispatch()
  async function setData() {
     await dispatch(GetUserProfile())
  }
 useEffect(()=>{
  setData()
 },[])
  return  isLoggedIn && allowedRoles.find((ele)=>ele==role) ?(
     <Outlet/>
  ):isLoggedIn ?( <Navigate to={"/dinied"}/> ):(<Navigate to={"/login"}/>)
}
export default RequireAuth