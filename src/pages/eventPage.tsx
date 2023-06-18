import { useParams } from "react-router";
import EventAPI, { EventObject } from "../API/EventAPI";
import APIError from "../API/APIError";
import { useEffect, useState } from "react";
import { ErrorMessage } from "formik";
import TokenManager from "../API/TokenManager";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from 'uuid';
import { cli } from "cypress";
import { TimeConverter } from "../misc/TimeConverter";

interface EventDetailsProps {
  target: EventObject;
}

function EventDetails({ target }: EventDetailsProps): JSX.Element {
  const dateTime: Date = new Date(target.moment);
  const navigate = useNavigate();
  const handleBuyTicketsClick = () => {
    navigate(`/event/${target.id}/tickets`);
  };

  return (
    <div className="event-details-container">
      <h3>{target.title}</h3>
      <p>Location: {target.location}</p>
      <p>
        Date:{" "}
        {`${dateTime.getDate()}/${
          dateTime.getMonth() + 1
        }/${dateTime.getFullYear()}`}
      </p>
      <p>Time: {`${TimeConverter.convertISOTimetoDisplay(dateTime.toString())}`}</p>
      {TokenManager.getAccessToken() && (
        <button className="standard-button" onClick={handleBuyTicketsClick}>Buy Tickets</button>
      )}
      <p>Tickets left: {target.remainingTickets}</p>
    </div>
  );
}

export function EventPage(): JSX.Element {
  const [subject, setSubject] = useState<EventObject>();
  const [errorMsg, setError] = useState<string>("");
  const [webSocketClient, setWebSocketClient] = useState<Client>();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    loadData();
    constructStompClient();
    
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

  const constructStompClient = () => {
    const client: Client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    client.onConnect = () => {
      client.subscribe('/topic/publicmessages', (data: any) => {
        console.log(data);
        onMessageReceived(data);
      })
    }
    
    client.activate();
    setWebSocketClient(client);
  };

  const sendNotif = () => {
    const payload = { id: uuidv4(), text: id }
    webSocketClient?.publish({ 'destination': '/topic/publicmessages', body: JSON.stringify(payload) });
  }

  const onMessageReceived = (data: any) => {
    const affectedId = JSON.parse(data.body)
    console.log("Data: ", data);
    console.log(data.body);
    
    if(affectedId.text === id)
    {
      loadData();
    }
  } 

  return (
    <>
      {errorMsg && <h2>{errorMsg}</h2>}
      {!errorMsg && !subject && <h2>Loading...</h2>}

      {/* Display the code below if there is no error and subject is defined. */}
      {subject && <EventDetails target={subject} />}
    </>
  );
}
