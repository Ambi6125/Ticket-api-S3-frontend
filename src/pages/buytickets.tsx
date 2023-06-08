import { useEffect, useState } from "react";
import EventAPI, { EventObject } from "../API/EventAPI";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import TokenManager from "../API/TokenManager";

export default function BuyTicketsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const idNumber: number = parseInt(id ?? "-1");

  const [subject, setSubject] = useState<EventObject>();
  useEffect(() => {
    const readResult = EventAPI.GetEventById(idNumber).then(response => {return response.event});
    console.log(typeof readResult + readResult);
    
  });
  return (
    <>
      <input type="number" min={1} max={subject?.remainingTickets}></input>
    </>
  );
}
