import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import Loader from "../UI/Loader";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  if (isLoggedIn === null) return <Loader />;

  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
