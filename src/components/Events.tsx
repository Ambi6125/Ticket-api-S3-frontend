import DelegateButton from "./DelegateButton";
import { TICKET_PERCENTAGE_THRESHOLD } from "../misc/GLOBAL";
import { Link } from "react-router-dom";
import { EventObject } from "../API/EventAPI";
import TokenManager from "../API/TokenManager";

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
function EventItemBox({ event }: EventItemProps): JSX.Element {
  const { id, title, artist, location, totalTickets, remainingTickets } = event;

  const moment = new Date(event.moment);

  const ticketThreshold = (remainingTickets / totalTickets) * 100;

  return (
    <div className="eventBox">
      <h2>{title}</h2>
      <p>{TokenManager.getClaims().roles?.includes("ADMIN") && id}</p>
      <br />
      <p>
        {`${location},\nat ${moment.getDay()}/${moment.getMonth() + 1}/${moment.getFullYear()} - ${moment.getHours()}:${moment.getMinutes()}`}
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
 * The key for every item is "event-x", where x is the id of the event itself.
 * @param events All events to be displayed.
 * @returns A functional, reusable component.
 */
export default function EventList({ items }: EventListProps): JSX.Element {
  if (typeof items === "undefined" || items.length === 0) {
    return (
      <>
        <h2>No events found.</h2>
        <p>Try again with another search term.</p>
      </>
    );
  }

  return (
    <>
      <div className="eventListHeader">
        <h2>Events</h2>
      </div>
      <div className="eventDisplayList">
        {items.map((item) => (
          <EventItemBox key={"event-" + item.id} event={item} />
        ))}
      </div>
    </>
  );
}
