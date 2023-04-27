import { toast } from 'react-hot-toast';
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
export default function PrivateRoutes(){
  let auth = sessionStorage.getItem('token');
const Not_Authenticate=()=>{
  // toast.error("Oops,You Already Login", {
  //   position: "bottom-center",
  //   duration: 3000,
  // })
  return (
    <Navigate to="/login"/>
  )
}
return (
    auth ? <Outlet/> : Not_Authenticate()
  )
}