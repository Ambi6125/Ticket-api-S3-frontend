import DelegateButton from "./DelegateButton";
import { TICKET_PERCENTAGE_THRESHOLD } from "../misc/GLOBAL";
import { Link } from "react-router-dom";
import { EventObject } from "../API/EventAPI";




interface EventListProps {
  items: EventObject[];
}

interface EventItemProps {
  event: EventObject;
}

/**
 * This component displays a box with information about a single event.
 * @param event The event to display in this box.
 * @returns A functional, reusable component.
 */
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

      <Link to={`/event/${id}`}>
        <button>View Event</button>
      </Link>
    </div>
  );
}

/**
 * A component that automatically renders components of type EventItem for every event provided, and displays them.
 * @param events All events to be displayed.
 * @returns A functional, reusable component.
 */
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
