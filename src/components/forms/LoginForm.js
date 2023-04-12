import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import validationSchema from "../../utils/validationSchema";
import classes from "./LoginForm.module.css";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

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
    validationSchema: validationSchema,
    onSubmit: submitHandler,
  });

  return (
    <>
      <h1>Log In</h1>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="email"
          type="email"
          placeholder="Enter your email"
          className={
            formik.errors.email && formik.touched.email
              ? classes.error
              : classes.input
          }
        />
        {formik.errors.email && formik.touched.email && (
          <p>{formik.errors.email}</p>
        )}
        <br />
        <label htmlFor="password">Password</label>
        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="password"
          type="password"
          placeholder="Enter your password"
          className={
            formik.errors.password && formik.touched.password
              ? classes.error
              : classes.input
          }
        />
        {formik.errors.password && formik.touched.password && (
          <p>{formik.errors.password}</p>
        )}
        <button type="submit">
          {formik.isSubmitting ? "submitting form" : "submit"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
