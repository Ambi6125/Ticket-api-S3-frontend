import { useState, useEffect } from "react";
import EventAPI, { EventObject } from "../API/EventAPI";
import EventTable from "../components/EventTable";
import TokenManager from "../API/TokenManager";
import { useNavigate } from "react-router";

export default function EventManagementPage(): JSX.Element {
  const [data, setData] = useState<EventObject[]>([]);
  const navigate = useNavigate();
  useEffect(() => {

    if(!TokenManager.getClaims()?.roles?.includes('ADMIN')) {
      navigate("/profile")
    }

    LoadData();
  }, []);

  const LoadData = async () => {
    await EventAPI.GetAll().then((response) =>{
        console.log("Response on page:");
        console.log(response); //Output: (16) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        console.log("Response.events on page:");
        console.log(response.events); //Output: undefined
        
        setData(response.events)
    });
  };

  return (
    <div className="table-container">
      <EventTable events={data} />
    </div>
  );
}
