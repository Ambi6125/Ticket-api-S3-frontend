import { useParams } from "react-router";
import EventAPI, { EventObject } from "../API/EventAPI";
import APIError from "../API/APIError";
import { useEffect, useState } from "react";
import { ErrorMessage } from "formik";

export function EventPage(): JSX.Element {
  const [subject, setSubject] = useState<EventObject>();
  const [errorMsg, setError] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    console.log(`Viewing event ${id}`);

    const eventId: number = parseInt(id ?? ""); // Convert id to number

    try {
      await EventAPI.GetEventById(eventId).then((response) => {
        setSubject(response.event);
        console.log(response);
      });
    } catch (error: any) {
      switch (error.response?.code) {
        case 404:
          setError("Event not found");
          break;
      }
    }
  };

  return (
    <>
      {errorMsg && <h2>{errorMsg}</h2>}
      {(!errorMsg && !subject) && <h2>Loading...</h2>}

      {/* Display the code below if there is no error and subject is defined. */}
      {subject && <h1>{subject.title}</h1>}
    </>
  );
}
