import { EventObject } from "../API/EventAPI";

interface BuyTicketsPageProps {
  target: EventObject;
}

function BuyTicketsPage({ target }: BuyTicketsPageProps): JSX.Element {
  return (
    <p>
      Left: {target.remainingTickets}/{target.totalTickets}
    </p>
  );
}
