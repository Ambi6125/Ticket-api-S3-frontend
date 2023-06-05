import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

interface LogInFormProps {
    onLogin: (username: string, password: string) => void
}


function LogInForm({ onLogin }: LogInFormProps): JSX.Element {

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
                  onLogin(values.tbUsername, values.tbPassword);
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

    export default LogInForm;
