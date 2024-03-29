import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f5f0e985;
  height: 650px;
  width: 900px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 992px) {
    height: 750px;
    width: 70%;
  }

  @media only screen and (max-width: 600px) {
    width: 90%;
  }

  @media only screen and (max-height: 760px) {
    height: 650px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 4em;

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

export const StyledToastContainer = styled(ToastContainer)`
  @media only screen and (max-width: 992px) {
    &&&.Toastify__toast-container {
      width: 50%;
      position: absolute;
      top: 6%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media only screen and (max-width: 600px) {
    &&&.Toastify__toast-container {
      top: 20%;
    }
  }
`;

export const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5em;
  gap: 0.5em;

  @media only screen and (max-width: 992px) {
    justify-content: center;
  }
`;

export const Label = styled.label`
  margin-top: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.5rem;
  font-size: 1rem;
  color: black;
  outline: none;
  border-style: none;
  border-bottom: 1px solid ${({ error }) => (error ? "transparent" : "black")};
  border-radius: 2px;
  ${({ error }) => error && "box-shadow: 1px -2px 5px red;"};

  &:focus {
    border-color: ${({ error }) => (error ? "red" : "blue")};
  }
`;

export const PasswordEyeLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -20px;
  width: 0;

  & img {
    width: 20px;
    height: 20px;
  }
`;

export const SignupImage = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;

  & img {
    height: 100%;
    width: 100%;
  }

  @media only screen and (max-width: 992px) {
    display: block;
    width: 0;

    & img {
      display: none;
    }

    & a {
      position: absolute;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const StyledLink = styled(Link)`
  text-align: center;
  position: relative;
  top: -15%;
`;

export const Button = styled.button`
  margin-top: 3em;
  border-style: none;
  border-radius: 2px;
  background-color: #0488cf;
  color: white;
  width: 35%;
  padding: 1.1em;

  &:hover {
    background-color: blue;
    transition: all 0.35s;
  }

  @media only screen and (max-width: 992px) {
    margin: 1.5em auto;
  }
`;

export const Paragraph = styled.p`
  color: red;
`;