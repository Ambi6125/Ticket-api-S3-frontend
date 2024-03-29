import "bootstrap/dist/css/bootstrap-grid.min.css";
import DelegateButton from "../components/DelegateButton";
import {
  AccountAPI,
  GetAccountResponse,
  CreateAccountResponse,
  Account,
} from "../API/AccountAPI";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { LoginAPI } from "../API/LoginAPI";
import TokenManager from "../API/TokenManager";
import LogInForm from "../components/LoginForm";
import { Profile } from "./profile";
import { useNavigate } from "react-router-dom";

export default function LoginPage(): JSX.Element {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [userInfo, setUserInfo] = useState<Account>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const HandleLoginClick = (username: string, password: string) => {
    LoginAPI.login(username, password)
      .then((claims) => {
        setClaims(claims);
        navigate("/profile"); // Redirect the user to the profile page after a successful login attempt
      })
      .then(getUserInfo)
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setErrorMessage("Invalid credentials");
        } else {
          setErrorMessage("Something went wrong");
        }
      });
  };

  useEffect(() => {
    if (TokenManager.getAccessToken()) {
      navigate("/profile");
    }

    const receivedClaims = TokenManager.getClaims();
    if (
      (receivedClaims?.roles?.includes("ADMIN") ||
        receivedClaims?.roles?.includes("USER")) &&
      receivedClaims?.accountId
    ) {
      navigate("/profile"); // Redirect the user to the profile page if they are already logged in
    }
    getUserInfo();
  }, [claims, navigate]);

  const getUserInfo = () => {
    const receivedClaims = TokenManager.getClaims();
    if (
      (receivedClaims?.roles?.includes("ADMIN") ||
        receivedClaims?.roles?.includes("USER")) &&
      receivedClaims?.accountId
    ) {
      AccountAPI.GetAccountById(receivedClaims.accountId)
        .then((account) => setUserInfo(account.account))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <LogInForm onLogin={HandleLoginClick} />
    </div>
  );
}

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();

  const handleRegisterClick = (
    username: string,
    password: string,
    email: string
  ): Promise<CreateAccountResponse> => {
    return AccountAPI.PostAccount(username, password, email).then(
      (response) => {
        if (response.id !== null) {
          alert("Registration successful");
          navigate("/login");
        }
        return response;
      }
    );
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
                      type="text"
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
