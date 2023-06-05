import DelegateButton from "../components/DelegateButton";
import { TICKET_PERCENTAGE_THRESHOLD } from "../misc/GLOBAL";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  artist: string;
  location: string;
  moment: Date;
  totalTickets: number;
  remainingTickets: number;
}

interface EventListProps {
  items: Event[];
}

interface EventItemProps {
  event: Event;
}

function EventItem({ event }: EventItemProps): JSX.Element {
  const {
    id,
    title,
    artist,
    location,
    moment,
    totalTickets,
    remainingTickets,
  } = event;

  const ticketThreshold = (remainingTickets / totalTickets) * 100;

  function HandleClick(id: number): void {}

  return (
    <div id={"event:" + id} className="eventBox">
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <br />
      <p>
        {location} at
        {moment.toDateString() +
          " " +
          moment.getHours() +
          ":" +
          moment.getMinutes()}
      </p>
      {ticketThreshold < TICKET_PERCENTAGE_THRESHOLD && ticketThreshold > 0 && (
        <p>Limited tickets left!</p>
      )}

      <Link to={`/event/${id}`}>View Event</Link>
    </div>
  );
}

export default function EventList({ items }: EventListProps): JSX.Element {
  return (
    <>
      <div className="eventDisplayList">
        <h2>Events</h2>
        {items.map((item) => (
          <EventItem event={item} />
        ))}
      </div>
    </>
  );
}
