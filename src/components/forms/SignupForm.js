import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signupSchema } from "../../utils/validationSchema";
import { authActions } from "../../store/authSlice";
import signupImage from "../../assets/signup-image.svg";
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
} from "./Signup.styles";

const SignupForm = () => {
  const dispatch = useDispatch();
  const submitHandler = (values, actions) => {
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
            {formik.errors.email && formik.touched.email && (
              <p>{formik.errors.email}</p>
            )}
          </InputContainer>
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
            {formik.errors.password && formik.touched.password && (
              <p>{formik.errors.password}</p>
            )}
          </InputContainer>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <InputContainer>
            <Input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              error={
                formik.errors.confirmPassword && formik.touched.confirmPassword
              }
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p>{formik.errors.confirmPassword}</p>
              )}
          </InputContainer>
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Signing Up...." : "Sign Up"}
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
