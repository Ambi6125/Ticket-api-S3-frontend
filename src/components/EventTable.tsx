import EventAPI, { EventObject } from "../API/EventAPI";
import { useState } from "react";

interface EventTableProps {
  events: EventObject[];
}

//TODO: Event get request processes as unauthorized.
export default function EventTable({ events }: EventTableProps): JSX.Element {
  return (
    <div className="table-container">
      <table className="table-display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Location</th>
            <th>Moment</th>
            <th>Total Tickets</th>
            <th>Remaining Tickets</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr className="glow-on-hover" key={event.id}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{event.location}</td>
              <td>{event.moment.toString()}</td>
              <td>{event.totalTickets}</td>
              <td>{event.remainingTickets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
