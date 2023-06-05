import { useParams } from "react-router";
import EventAPI, { EventObject } from "../API/EventAPI";
import APIError from "../API/APIError";
import { useEffect, useState } from "react";

export function EventPage(): JSX.Element {
  const [subject, setSubject] = useState<EventObject>({
    id: 0,
    title: "",
    location: "",
    moment: new Date(),
    remainingTickets: 0,
    totalTickets: 0,
  });
  useEffect(() => {
    loadData;
  }, []);
  const loadData = async () => {
    const { id } = useParams<{ id: string }>();
    const eventId: number = parseInt(id ?? ""); // Convert id to number

    try {
      const response = await EventAPI.GetEventById(eventId);
      //
      console.log(response.event);
    } catch (error: any) {
      switch (error.response.code) {
        case 404:
          return <h2>Event not found</h2>;
      }
    }
  };

  //TODO: fix possible unresolved response
  return (
    <>
      <h2>Test</h2>
    </>
  );
}
