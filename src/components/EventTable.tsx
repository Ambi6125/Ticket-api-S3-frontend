import { EventObject } from "../API/EventAPI";
import { useTable } from "react-table";

const columns = [
  {
    Header: "ID",
    accessor: "id"
  },
  {
    Header: "Title",
    accessor: "title"
  },
  {
    Header: "Location",
    accessor: "location"
  },
  {
    Header: "Moment",
    accessor: "moment"
  },
  {
    Header: "Total tickets",
    accessor: "totalTickets"
  },
  {
    Header: "Remaining tickets",
    accessor: "remainingTickets"
  },
];

interface EventTableProps {
  events: EventObject[];
}
export default function EventTable({ events }: EventTableProps): JSX.Element {}
