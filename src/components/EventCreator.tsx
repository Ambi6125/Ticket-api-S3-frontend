import { useEffect, useState } from "react";
import EventAPI, { EventObject } from "../API/EventAPI";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TokenManager from "../API/TokenManager";
import { useNavigate } from "react-router";

export function EventCreator(): JSX.Element {
  const [responseMessage, setMessage] = useState<string>("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!TokenManager.getClaims().roles?.includes("ADMIN")) {
      navigate("/events");
    }
  }, []);

  const handleSubmit = (
    title: string,
    location: string,
    moment: Date,
    tickets: number
  ) => {
    console.log("Submitting " + title);
    return EventAPI.CreateEvent(title, location, moment, tickets);
  };

  const validationSchema = Yup.object({
    tbTitle: Yup.string()
      .min(2, "Must be at least 2 characters long.")
      .max(50, "50 characters at most.")
      .required("Required field."),
    tbLocation: Yup.string()
      .min(5, "Must be a detailed location.")
      .max(60, "No more than 60 characters")
      .required("Required field"),
    dtpMoment: Yup.date()
      .test("not-today", "Must be more than 1 day from now", (value: Date | undefined) => {
        const tomorrow: Date = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return value! >= tomorrow;
      })
      .required("Required"),
    nmudTotalTickets: Yup.number().min(10).max(99999),
  });

  return (
    <>
      <div>
        <h2>Create event</h2>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            tbTitle: "",
            tbLocation: "",
            dtpMoment: new Date().toISOString().slice(0, 16), // Set initial value as a string in the format "YYYY-MM-DDTHH:mm"
            nmudTotalTickets: 50,
          }}
          onSubmit={(values, { setSubmitting }) => {
            const correctDate: Date = new Date(values.dtpMoment);
            handleSubmit(
              values.tbTitle,
              values.tbLocation,
              correctDate,
              values.nmudTotalTickets
            )
              .then(() => {
                setMessage("Successfully created " + values.tbTitle);
                setSubmitting(false);
              })
              .catch((error) => setMessage("Something went wrong."));
          }}
        >
          <Form>
            <div className="create-event-container">
              <h2>{responseMessage}</h2>
              <div className="form-container">
                <div className="input-container">
                  <label>Title</label>
                  <Field name="tbTitle" placeholder="Title" type="text" />
                  <ErrorMessage
                    name="tbTitle"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="input-container">
                  <label>Location</label>
                  <Field name="tbLocation" placeholder="Location" type="text" />
                  <ErrorMessage
                    name="tbLocation"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="input-container">
                  <label>Date & Time</label>
                  <Field name="dtpMoment" type="datetime-local" />
                  <ErrorMessage
                    name="dtpMoment"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="input-container">
                  <label>Available Tickets</label>
                  <Field
                    type="number"
                    name="nmudTotalTickets"
                    placeholder="Tickets available"
                    min={10}
                    max={99999}
                  />
                  <ErrorMessage
                    name="nmudTotalTickets"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <button type="submit" className="standard-button">
                Create
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
