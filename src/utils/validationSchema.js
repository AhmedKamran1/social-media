import * as yup from "yup";

const passRegex = "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$";

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("email is required"),
  password: yup
    .string()
    .min(8)
    .required("password is required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "passwords must match")
//     .required("please confirm password"),
});

export default validationSchema;
