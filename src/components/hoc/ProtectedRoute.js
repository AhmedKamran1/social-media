import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
