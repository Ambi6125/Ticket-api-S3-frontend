import { Fragment, useEffect, useState } from "react";
import EventAPI, { EventObject, GetEventsResponse } from "../API/EventAPI";
import SearchBar from "../components/SearchBar";
import EventList from "../components/Events";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import TokenManager from "../API/TokenManager";
import { useNavigate } from "react-router";
import { values } from "cypress/types/lodash";

export function EventManagementPage(): JSX.Element {
  const [searchResult, setSearchResult] = useState<EventObject[]>([]);
  const [responseMessage, setMessage] = useState<string>("");

  //TODO: In case of a future search bar, use this to process results.
  const processSearchResults = (data: GetEventsResponse) => {
    setSearchResult(data.events);
  };

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
      .test(
        "is-one-week-from-now",
        "Must be more than 7 days from now",
        (value: Date | undefined) => {
          const oneWeek: Date = new Date();
          oneWeek.setDate(oneWeek.getDate() + 7);
          return value! >= oneWeek;
        }
      )
      .required("Required"),
    nmudTotalTickets: Yup.number().min(10).max(99999),
  });

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          tbTitle: "",
          tbLocation: "",
          dtpMoment: Date.now(),
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
              setMessage("Succesfully created.");
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
              </div>
              <div className="input-container">
                <Field name="tbLocation" placeholder="Location" type="text" />
              </div>
              <div className="input-container">
                <label>Date & time:</label>
                <Field name="dtpMoment" type="datetime-local" />
              </div>
              <div className="input-container">
                <label>Available tickets</label>
                <Field
                  type="number"
                  name="nmudTotalTickets"
                  placeholder="Tickets available"
                  min={10}
                  max={99999}
                />
              </div>
            </div>
            <button type="submit" className="standard-button">
              Create
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
