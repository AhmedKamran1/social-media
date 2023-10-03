import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../utils/validationSchema";
import { authActions } from "../../store/authSlice";
import loginImage from "../../assets/login-image.svg";
import eyeOpenImage from "../../assets/eye-open.svg";
import eyeCloseImage from "../../assets/eye-close.svg";
import steamImage from "../../assets/steam.png";
import googleImage from "../../assets/google.png";
import githubImage from "../../assets/github.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BackgroundImage,
  Container,
  FormBackgroundImage,
  LoginImageContainer,
  LoginImage,
  StyledLink,
  FormContainer,
  HeadingContainer,
  Heading,
  StyledToastContainer,
  Form,
  Label,
  InputContainer,
  Input,
  Paragraph,
  PasswordEyeIconContainer,
  Icon,
  LoginButton,
  Divider,
  AltLoginContainer,
  ButtonContainer,
  LoginIconContainer,
} from "./LoginForm.styles";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const viewPassHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const submitHandler = (values, actions) => {
    dispatch(
      authActions.loginHandler({
        type: "LOGIN",
        email: values.email,
        password: values.password,
      })
    );

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser == null) {
      toast.error("Invalid email/password combination");
    }

    setTimeout(() => {
      formik.setSubmitting(false);
    }, 4500);
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: submitHandler,
  });

  return (
    <>
      <BackgroundImage />
      <Container>
        <FormBackgroundImage />
        <LoginImageContainer>
          <LoginImage src={loginImage} />
          <StyledLink to="/signup">Create an account</StyledLink>
        </LoginImageContainer>
        <Divider className="page-divider" />
        <FormContainer>
          <HeadingContainer>
            <Heading>Log In</Heading>
            <StyledToastContainer
              position="top-center"
              autoClose={3000}
              limit={1}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme="light"
            />
          </HeadingContainer>
          <Form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <InputContainer>
              <Input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                type="email"
                placeholder="Enter Email"
                error={formik.errors.email && formik.touched.email}
              />
            </InputContainer>
            {formik.errors.email && formik.touched.email && (
              <Paragraph className="error-paragraph">
                {formik.errors.email}
              </Paragraph>
            )}
            <Label htmlFor="password">Password</Label>
            <InputContainer>
              <Input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                error={formik.errors.password && formik.touched.password}
              />
              <PasswordEyeIconContainer>
                <Icon
                  onClick={viewPassHandler}
                  src={showPassword ? eyeCloseImage : eyeOpenImage}
                />
              </PasswordEyeIconContainer>
            </InputContainer>
            {formik.errors.password && formik.touched.password && (
              <Paragraph className="error-paragraph">
                {formik.errors.password}
              </Paragraph>
            )}
            <LoginButton
              className="login-button"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging In..." : "Log In"}
            </LoginButton>
            <Divider className="button-divider">
              <Paragraph className="divider-paragraph">OR</Paragraph>
            </Divider>
            <AltLoginContainer>
              <ButtonContainer>
                <LoginIconContainer>
                  <Icon src={steamImage} />
                </LoginIconContainer>
                <LoginButton
                  className="alt-login-button"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Steam
                </LoginButton>
              </ButtonContainer>
              <ButtonContainer>
                <LoginIconContainer>
                  <Icon src={googleImage} />
                </LoginIconContainer>
                <LoginButton
                  className="alt-login-button"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Google
                </LoginButton>
              </ButtonContainer>
              <ButtonContainer>
                <LoginIconContainer>
                  <Icon src={githubImage} />
                </LoginIconContainer>
                <LoginButton
                  className="alt-login-button"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Github
                </LoginButton>
              </ButtonContainer>
            </AltLoginContainer>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default LoginForm;