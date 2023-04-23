import * as yup from "yup";

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is a required field!"),
  password: yup.string().min(8).required("Password is a required field!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password do not match")
    .required("Please confirm password!"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is a required field!"),
  password: yup.string().min(8).required("Password is a required field!"),
});