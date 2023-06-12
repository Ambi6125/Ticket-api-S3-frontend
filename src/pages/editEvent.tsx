import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventAPI, { EventObject } from "../API/EventAPI";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EventEditPage(): JSX.Element {
  const { id } = useParams();
  const [eventData, setEventData] = useState<EventObject>();
  const idNumber: number = parseInt(id ? id : "-1");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const validationSchema = Yup.object({
    tbTitle: Yup.string()
      .min(2, "At least 2 characters.")
      .max(50, "Not more than 50 characters.")
      .required("Required"),
    tbLocation: Yup.string()
      .min(4, "At least 4 characters.")
      .max(150, "Not more than 150 characters.")
      .required("Required"),
  });

  useEffect(() => {
    EventAPI.GetEventById(idNumber)
      .then((response) => {
        setEventData(response.event);
      })
      .catch((error) => console.log("Error fetching event data:", error));
  }, [id]);

  return (
    <div className="form-container update-form">
      {statusMessage && <h4>{statusMessage}</h4>}
      <Formik
        initialValues={{
          tbTitle: eventData?.title || "",
          tbLocation: eventData?.location || "",
          moment: eventData?.moment ? new Date(eventData.moment) : null,
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          EventAPI.UpdateEvent({
            id: eventData!.id,
            title: values.tbTitle,
            location: values.tbLocation,
            moment: values.moment!,
            totalTickets: eventData!.totalTickets,
            remainingTickets: eventData!.remainingTickets,
          })
            .then(() => setStatusMessage("Succesfully updated."))
            .catch(() => setStatusMessage("Something went wrong."));
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="form-control">
              <label htmlFor="tbTitle">Title:</label>
              <Field type="text" id="tbTitle" name="tbTitle" />
              <ErrorMessage
                name="tbTitle"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-control">
              <label htmlFor="tbLocation">Location:</label>
              <Field type="text" id="tbLocation" name="tbLocation" />
              <ErrorMessage
                name="tbLocation"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-control">
              <label htmlFor="moment">Moment:</label>
              <DatePicker
                id="moment"
                name="moment"
                selected={values.moment}
                onChange={(date) => setFieldValue("moment", date)}
                dateFormat="yyyy-MM-dd HH:mm"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
              />
              <ErrorMessage
                name="moment"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
