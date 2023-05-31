import "bootstrap/dist/css/bootstrap-grid.min.css";
import DelegateButton from "../components/DelegateButton";
import {
  AccountAPI,
  GetAccountResponse,
  CreateAccountResponse,
} from "../API/AccountAPI";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { event } from "cypress/types/jquery";

//TODO: Use Yup and Formik

export default function LoginPage(): JSX.Element {
  const HandleLoginClick = (username: string): Promise<GetAccountResponse> => {
    return AccountAPI.GetAccountByUsername(username);
  };

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    tbUsername: Yup.string()
      .min(4, "Must be at least 4 characters long.")
      .max(50, "Not more than 50 characters.")
      .required("Required."),
    tbPassword: Yup.string()
      .min(8, "Must be at least 8 characters long.")
      .max(60, "No more than 60 characters.")
      .required("Required."),
  });

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center box-with-shadow">
          <h1>Log in</h1>
          <Formik
            initialValues={{ tbUsername: "", tbPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              HandleLoginClick(values.tbUsername);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-container">
                  <div className="input-container">
                    <Field
                      name="tbUsername"
                      placeholder="Username"
                      autoComplete="current-username"
                    />

                    {errors.tbUsername && touched.tbUsername ? (
                      <div>{errors.tbUsername}</div>
                    ) : null}
                  </div>
                  <div className="input-container">
                    <Field
                      name="tbPassword"
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    {errors.tbPassword && touched.tbPassword ? (
                      <div>{errors.tbPassword}</div>
                    ) : null}
                  </div>
                  <button type="submit">Log in</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export function RegisterPage(): JSX.Element {
  const [tbUsername, setUsername] = useState("");
  const [tbPassword, setPassword] = useState("");
  const [tbEmail, setEmail] = useState("");
  const handleRegisterClick = (
    username: string,
    password: string,
    email: string
  ): Promise<CreateAccountResponse> => {
    return AccountAPI.PostAccount(username, password, email);
  };

  const validationSchema = Yup.object({
    tbUsername: Yup.string()
      .min(4, "Must be at least 4 characters long.")
      .max(50, "Not more than 50 characters.")
      .required("Please enter a username."),
    tbPassword: Yup.string()
      .min(8, "Must be at least 8 characters long.")
      .max(60, "No more than 60 characters.")
      .required("Password is required."),
    tbEmail: Yup.string().email("Invalid email address.").required("Required."),
  });

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center box-with-shadow">
          <h1>Register</h1>
          <Formik
            initialValues={{ tbUsername: "", tbPassword: "", tbEmail: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleRegisterClick(
                values.tbUsername,
                values.tbPassword,
                values.tbEmail
              ).then(() => {
                setSubmitting(false);
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-container">
                  <div className="input-container">
                    <Field
                      name="tbUsername"
                      placeholder="Username"
                      autoComplete="username"
                    />
                    {errors.tbUsername && touched.tbUsername ? (
                      <div>{errors.tbUsername}</div>
                    ) : null}
                  </div>
                  <div className="input-container">
                    <Field
                      name="tbPassword"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                    {errors.tbPassword && touched.tbPassword ? (
                      <div>{errors.tbPassword}</div>
                    ) : null}
                  </div>
                  <div className="input-container">
                    <Field
                      name="tbEmail"
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                    />
                    {errors.tbEmail && touched.tbEmail ? (
                      <div>{errors.tbEmail}</div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={Object.keys(errors).length !== 0}
                  >
                    Register
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
