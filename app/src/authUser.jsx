import {  Navigate ,useLocation, Outlet} from "react-router-dom";
;

const AuthUser = ({ allowedRoles }) => {
  const location = useLocation();


  if (allowedRoles) {
    return <Outlet />;
  } else 
    return <Navigate to="/register" state={{ from: location }} replace />;
  }
;

export default AuthUser;