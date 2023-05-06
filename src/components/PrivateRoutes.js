import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom'
export default function PrivateRoutes(){
  let auth = sessionStorage.getItem('token');
  const [istoast,setIsToast] = useState(false);
    
  const Not_Authenticate=()=>{
    toast.error("You are Already Logeed in", {
      position: "top-right",
      duration: 3000,
    })
    setIsToast(true)
  return (
    <>
    {istoast ? 
    
    <div>
      <Toaster />
    </div>:null}
    {setTimeout(() => 
    // console.log("first")
      <Navigate to="/login"/>
    , 1500)}
    </>
  )
}
return (
    auth ? <Outlet/> : Not_Authenticate()
  )
}