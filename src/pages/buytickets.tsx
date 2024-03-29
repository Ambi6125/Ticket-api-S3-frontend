import { useEffect, useState } from "react";
import EventAPI, { EventObject } from "../API/EventAPI";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import TokenManager from "../API/TokenManager";
import { TicketAPI, BuyTicketsRequest } from "../API/TicketAPI";
import { event } from "cypress/types/jquery";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from 'uuid';


export default function BuyTicketsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [webSocketClient, setWebSocketClient] = useState<Client>();
  const idNumber: number = parseInt(id ?? "-1");
  const navigate = useNavigate();

  const [subject, setSubject] = useState<EventObject | undefined>();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    loadData();
    constructStompClient();
    console.log("Client on buying page: ", webSocketClient);
    
  }, []);

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
      })
    }
    
    client.activate();
    setWebSocketClient(client);
  };

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

  const handleBuyClick = () => {
    const userId = TokenManager.getClaims()?.accountId;
    const eventId = subject?.id;
    const quantity = amount;

    const request: BuyTicketsRequest = {
      buyerId: userId,
      eventId: eventId!,
      amount: quantity,
    };

    TicketAPI.BuyTickets(request)
      .then(() => {
        alert(
          `Congratulations on your purchase of ${quantity} tickets for ${subject?.title}!`
        );
        sendNotif();
        navigate("/profile");
      })
      .catch((error) => {
        alert("Something went wrong.");
        console.log("Error purchasing:", error);
      });
  };


  const sendNotif = () => {
    const payload = { id: uuidv4(), text: id }
    webSocketClient?.publish({ 'destination': '/topic/publicmessages', body: JSON.stringify(payload) });
  }

  return (
    <>
      {responseMessage ||
        (subject && (
          <div className="purchase-ticket-container">
            <h2>Purchase Tickets for {subject.title}</h2>
            <input
              type="number"
              min={1}
              max={getMaxValue(subject.remainingTickets)}
              placeholder="Amount"
              onChange={(event) => setAmount(parseInt(event.target.value))}
            />
            <button className="standard-button" onClick={handleBuyClick}>Buy</button>
            {responseMessage && <p>{responseMessage}</p>}
          </div>
        ))}
    </>
  );
}
