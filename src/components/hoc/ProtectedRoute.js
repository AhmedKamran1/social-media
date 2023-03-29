import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  return isLoggedIn ? <Outlet></Outlet> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;
