import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import SignupForm from "./components/forms/SignupForm";
import ProtectedRoute from "./components/hoc/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
          <Route index path="/login" element={<LoginForm />} />
          <Route index path="/signup" element={<SignupForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profiles/:userId" element={<UserProfile />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
