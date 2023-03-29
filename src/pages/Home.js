import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/wrapper/Wrapper";
import classes from "./Home.module.css"
import Friends from "../components/friends/Friends";
import { authActions } from "../store/authSlice";

const Home = () => {
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const profileViewHandler = () => {
    navigate(`/profiles/${currentUser.email}`)
  }

  const logoutHandler = () => {
    dispatch(authActions.loginHandler({type: "LOGOUT"}))
  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={logoutHandler}>Logout</button>
      <Wrapper className={classes.userprofile} onClick={profileViewHandler}>{currentUser.email}</Wrapper>
      <Friends/>
    </>
  );
};

export default Home;
