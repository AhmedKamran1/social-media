import { Link } from "react-router-dom";
import styled from "styled-components";

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

export const LoginImage = styled.div`
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
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const StyledLink = styled(Link)`
  text-align: center;
  position: relative;
  top: -20%;
`;

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media only screen and (max-width: 992px) {
    justify-content: center;
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
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.5rem;
  font-size: 1rem;
  color: black;
  outline: none;
  border-style: none;
  border-bottom: 1px solid ${({ error }) => (error ? "red" : "black")};

  &:focus {
    border-color: ${({ error }) => (error ? "red" : "blue")};
  }
`;

export const EmailLogo = styled.div`
  background: url("");
  width: 10%;
`;

export const PasswordLogo = styled.div`
  background: url("");
  width: 10%;
`;

export const PasswordEyeOpenLogo = styled.div`
  background: url("");
  width: 10%;
`;

export const PasswordEyeCloseLogo = styled.div`
  background: url("");
  width: 10%;
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