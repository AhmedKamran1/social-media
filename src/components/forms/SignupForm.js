import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signupSchema } from "../../utils/validationSchema";
import { authActions } from "../../store/authSlice";
import signupImage from "../../assets/signup-image.svg";
import eyeOpenImage from "../../assets/eye-open.svg";
import eyeCloseImage from "../../assets/eye-close.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Button,
  Form,
  Label,
  Input,
  FormContainer,
  HeadingContainer,
  SignupImage,
  StyledLink,
  InputContainer,
  Paragraph,
  PasswordEyeLogo,
  StyledToastContainer,
} from "./Signup.styles";

const SignupForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const viewPassHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const submitHandler = (values, actions) => {
    const users = JSON.parse(localStorage.getItem("users")) ?? [];
    const userIndex = users.findIndex((user) => user.email === values.email);
    if (userIndex === -1) {
      dispatch(
        authActions.signupHandler({
          email: values.email,
          password: values.password,
          bgPhoto: null,
          profilePhoto: null,
          friendRequests: [],
          friendList: [],
        })
      );
      actions.resetForm();
      toast.success("Account created successfully");
    } else {
      toast.error("User already exists");
    }
    setTimeout(() => {
      formik.setSubmitting(false);
    }, 4500);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: submitHandler,
  });

  return (
    <Container>
      <FormContainer>
        <HeadingContainer>
          <h1>Sign Up</h1>
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
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <InputContainer>
            <Input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              error={
                formik.errors.confirmPassword && formik.touched.confirmPassword
              }
            />
          </InputContainer>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <Paragraph>{formik.errors.confirmPassword}</Paragraph>
          )}
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Signing up..." : "Sign up"}
          </Button>
        </Form>
      </FormContainer>
      <SignupImage>
        <img src={signupImage} />
        <StyledLink to="/login">I am already a member</StyledLink>
      </SignupImage>
    </Container>
  );
};

export default SignupForm;