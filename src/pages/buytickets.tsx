import { useEffect, useState } from "react";
import EventAPI, { EventObject } from "../API/EventAPI";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import TokenManager from "../API/TokenManager";

export default function BuyTicketsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const idNumber: number = parseInt(id ?? "-1");

  const [subject, setSubject] = useState<EventObject | undefined>();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const readResult = await EventAPI.GetEventById(idNumber).then(
      (response) => {
        setSubject(response.event);
      }
    );
    console.log(typeof readResult + readResult);
  };

  /**
   * Calculates the maximum tickets that can be purchased, which is the biggest possible of the following set:
   * {  T / 4, remaining T, 5 }
   */
  function getMaxValue(remainingTickets: number): number {
    if (remainingTickets < 5) {
      return remainingTickets;
    }
    return Math.max(5, Math.floor(remainingTickets / 4));
  }

  return (
    <>
      {subject && (
        <div className="purchase-ticket-container">
          <h2>Purchase Tickets for {subject.title}</h2>
          <input
            type="number"
            min={1}
            max={getMaxValue(subject.remainingTickets)}
            placeholder="Amount"
          />
          <button onClick={() => console.log("Not implemented")}>Buy</button>
        </div>
      )}
    </>
  );
}
