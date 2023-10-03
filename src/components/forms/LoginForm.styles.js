import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import loginimage from "../../assets/login-background.jpg";
import backgroundimage from "../../assets/loginpage-background.jpg";

export const BackgroundImage = styled.div`
  opacity: 0.3;
  height: 100vh;
  width: 100vw;
  background-image: url(${({ bgImage }) => bgImage});
  background-size: cover;
`;

BackgroundImage.defaultProps = { bgImage: backgroundimage };

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  color: black;
  height: 650px;
  width: 900px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.2);
  font-family: "Roboto Slab", serif;

  @media only screen and (max-width: 992px) {
    height: 750px;
    width: 70%;
    transition: all 0.4s;
  }

  @media only screen and (max-width: 600px) {
    width: 90%;
  }

  @media only screen and (max-height: 760px) {
    height: 650px;
  }
`;

export const FormBackgroundImage = styled.div`
  position: absolute;
  opacity: 0.1;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background-image: url(${({ loginImage }) => loginImage});
  background-size: cover;
`;

FormBackgroundImage.defaultProps = { loginImage: loginimage };

export const LoginImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;

  @media only screen and (max-width: 992px) {
    display: block;
    width: 0;
  }
`;

export const LoginImage = styled.img`
  height: 100%;
  width: 100%;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

export const StyledLink = styled(Link)`
  text-align: center;
  position: relative;
  text-decoration-color: black;
  color: black;
  top: -20%;

  @media only screen and (max-width: 992px) {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 4em;
  z-index: 1;

  @media only screen and (max-width: 992px) {
    height: 100%;
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    padding: 3em;
  }

  @media only screen and (max-width: 300px) {
    padding: 1em;
  }
`;

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media only screen and (max-width: 992px) {
    justify-content: center;
  }
`;

export const Heading = styled.h1``;

export const StyledToastContainer = styled(ToastContainer)`
  @media only screen and (min-width: 993px) {
    &&&.Toastify__toast-container {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media only screen and (max-width: 992px) {
    &&&.Toastify__toast-container {
      width: 60%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media only screen and (max-width: 600px) {
    &&&.Toastify__toast-container {
      width: 70%;
    }
  }

  @media only screen and (max-width: 300px) {
    &&&.Toastify__toast-container {
      width: 90%;
      top: -3%;
    }
  }
`;

export const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5em;

  @media only screen and (max-width: 992px) {
    justify-content: center;
  }
`;

export const Label = styled.label`
  margin-top: 1rem;
  font-weight: bold;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.6rem;
  font-size: 1rem;
  color: black;
  background-color: rgb(229 246 255);
  outline: none;
  border-style: none;
  border-radius: 5px;
  border-bottom: 1px solid ${({ error }) => (error ? "transparent" : "black")};
  ${({ error }) => error && "box-shadow: 1px -2px 5px red;"};

  ::placeholder {
    color: black;
  }

  &:focus {
    border-color: ${({ error }) => (error ? "red" : "blue")};
    background-color: white;
  }
`;

export const Paragraph = styled.p`
  &.error-paragraph {
    color: red;
  }
  &.divider-paragraph {
    font-weight: bold;
    text-align: center;
  }
`;

export const PasswordEyeIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -20px;
  width: 0;
`;

export const Icon = styled.img`
  width: 30px;
  height: 20px;
`;

export const LoginButton = styled.button`
  border-style: none;
  border-radius: 4px;
  background-color: #0488cf;
  background-image: linear-gradient(lightblue, #3f87a6 50%);
  color: white;
  font-weight: bold;
  width: 50%;
  padding: 1.1em;
  cursor: pointer;
  transition: all 1s;

  &.login-button {
    margin: 1em auto;
    padding: 1.1em;
  }

  &.alt-login-button {
    margin: 0.2em;
    padding-left: 2em;
  }

  &:hover {
    background-image: none;
    background-color: blue;
    transition: all 1s;
  }

  &:active {
    background-color: rgb(9 46 66);
  }

  @media only screen and (max-width: 992px) {
    &.login-button {
      margin: 1.5em auto;
      transition: all 0.4s;
    }

    &.alt-login-button {
      margin: 0.6em;
    }
  }
`;

export const Divider = styled.div`
  &.page-divider {
    height: 85%;
    border: 1px solid rgb(137 245 255);
    position: relative;
    left: 2%;
  }

  @media only screen and (max-width: 992px) {
    &.page-divider {
      display: none;
    }
  }

  &.button-divider {
    width: 80%;
    margin: auto;
    padding: 0.15em;
    margin-bottom: 0.4em;
  }
`;

export const AltLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LoginIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 15%;
  width: 0;
`;