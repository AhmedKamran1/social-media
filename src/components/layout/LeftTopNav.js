import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import {
  Container,
  NavOption,
  ProfileImage,
  Icon,
  Option,
} from "./LeftTopNav.styles";
import image from "../../assets/bg.jpg";
import { NavLink } from "react-router-dom";

const LeftTopNav = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.loginHandler({ type: "LOGOUT" }));
  };

  return (
    <Container>
      <NavOption>
        <ProfileImage src={image} />
      </NavOption>
      <NavOption>
        <Icon src={image} />
        <NavLink to="/">Home</NavLink>
      </NavOption>
      <NavOption>
        <Icon src={image} />
        <Option>Search</Option>
      </NavOption>
      <NavOption>
        <Icon src={image} />
        <Option>Your Activity</Option>
      </NavOption>
      <NavOption>
        <Icon src={image} />
        <Option>Saved</Option>
      </NavOption>
      <NavOption>
        <Icon src={image} />
        <Option>Notification</Option>
      </NavOption>
      <NavOption>
        <Icon src={image} />
        <Option>Friend Requests</Option>
      </NavOption>
      <NavOption>
        <Icon src={image} />
        <Option>Switch Theme</Option>
      </NavOption>
      <NavOption onClick={logoutHandler}>
        <Icon src={image} />
        <Option>Logout</Option>
      </NavOption>
    </Container>
  );
};

export default LeftTopNav;
