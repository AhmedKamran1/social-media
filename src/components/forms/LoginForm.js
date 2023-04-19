import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginSchema } from "../../utils/validationSchema";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/login-image.svg";
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
} from "./LoginForm.styles";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (values, actions) => {
    dispatch(
      authActions.loginHandler({
        type: "LOGIN",
        email: values.email,
        password: values.password,
      })
    );
    actions.resetForm();
    navigate("/");
  };

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
        <StyledLink to='/signup'>Create an account</StyledLink>
      </LoginImage>
      <FormContainer>
        <HeadingContainer>
          <h1>Log In</h1>
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
              placeholder="Enter your email"
              error={formik.errors.email && formik.touched.email}
            />
          </InputContainer>
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
          <Label htmlFor="password">Password</Label>
          <InputContainer>
            <Input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              type="password"
              placeholder="Enter your password"
              error={formik.errors.password && formik.touched.password}
            />
          </InputContainer>
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Logging In...." : "Log In"}
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
