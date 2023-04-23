import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../utils/validationSchema";
import { authActions } from "../../store/authSlice";
import loginImage from "../../assets/login-image.svg";
import eyeOpenImage from "../../assets/eye-open.svg";
import eyeCloseImage from "../../assets/eye-close.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormContainer,
  Button,
  Form,
  Label,
  Input,
  HeadingContainer,
  InputContainer,
  LoginImage,
  StyledLink,
  Container,
  Paragraph,
  PasswordEyeLogo,
  StyledToastContainer,
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
    <Container>
      <LoginImage>
        <img src={loginImage} />
        <StyledLink to="/signup">Create an account</StyledLink>
      </LoginImage>
      <FormContainer>
        <HeadingContainer>
          <h1>Log In</h1>
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
            <Paragraph>{formik.errors.email}</Paragraph>
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
            <PasswordEyeLogo>
              <img
                onClick={viewPassHandler}
                src={showPassword ? eyeCloseImage : eyeOpenImage}
              />
            </PasswordEyeLogo>
          </InputContainer>
          {formik.errors.password && formik.touched.password && (
            <Paragraph>{formik.errors.password}</Paragraph>
          )}
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Logging In..." : "Log In"}
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;