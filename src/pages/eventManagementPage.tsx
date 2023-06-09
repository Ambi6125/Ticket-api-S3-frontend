import { useState, useEffect } from "react";
import EventAPI, { EventObject } from "../API/EventAPI";
import EventTable from "../components/EventTable";


export default function EventManagementPage(): JSX.Element {
    const [data, setData] = useState<EventObject[]>();
    
    useEffect(() =>{
        //TODO: Get event data.
    }, [])

    return (
        <div className="table-container">
            <EventTable  />
        </div>
    );
} 

