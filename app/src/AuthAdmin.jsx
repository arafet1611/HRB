import {  Navigate , useLocation,Outlet } from "react-router-dom";
;

const AuthAdmin = ({ allowedRoles }) => {
    const location = useLocation();


  if (allowedRoles) {
    return <Outlet />;
  } else 
    return <Navigate to="/" state={{ from: location }} replace />;
  }
;

export default AuthAdmin;