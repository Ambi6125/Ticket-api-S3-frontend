import { useNavigate } from "react-router";
import EventAPI, { EventObject } from "../API/EventAPI";
import { useState } from "react";
import { TimeConverter } from "../misc/TimeConverter";

interface EventTableProps {
  events: EventObject[];
}

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export default function EventTable({ events }: EventTableProps): JSX.Element {
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10, // Number of items to display per page
  });


  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState<string>("");

  const { currentPage, itemsPerPage } = pagination;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(filterValue.toLowerCase()) ||
      event.location.toLowerCase().includes(filterValue.toLowerCase())
    );
  });

  // Get the events to display based on the current page
  const eventsToDisplay = filteredEvents.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setPagination((prevState) => ({ ...prevState, currentPage: pageNumber }));
  };

  //Handle row click
  const handleRowClick = (eventId: number) => {
    navigate(`/event/${eventId}/edit`)
  }

  const totalPages = Math.ceil(events.length / itemsPerPage);

  return (
    <div className="table-container fixed-table-size">
      <label></label>
      <input
        type="text"
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Search by title or location"
      />
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
          {eventsToDisplay.map((event) => (
            <tr className="glow-on-hover" key={event.id} onClick={() => handleRowClick(event.id)}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{event.location}</td>
              <td>{TimeConverter.convertISOtoDisplay(event.moment.toString())}</td>
              <td>{event.totalTickets}</td>
              <td>{event.remainingTickets}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages })
            .filter((_, index) => index < filteredEvents.length / itemsPerPage)
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          <button
            disabled={currentPage === totalPages || totalPages ===1}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
