import EventList from "../components/Events";
import SearchBar from "../components/SearchBar";
import EventAPI, { EventObject } from "../API/EventAPI";
import { useState } from "react";

/**
 * Resembles a page to browse and search available events, such as concerts.
 * @returns A page component to browse through EventObjects.
 */
export default function EventBrowser(): JSX.Element {
  const [responseEntities, setResponseEntities] = useState<EventObject[]>([]); //Events in this array are passed down to the event list.

  const putReceivedDataInUseState = (data: any) => {
    console.log(data);
    setResponseEntities(data);
  };

  return (
    <div className="eventBrowserContainer">
        <SearchBar
          responseCatcher={putReceivedDataInUseState}
          searchMethod={EventAPI.GetEventsOnSearch}
          searchBarText="Enter an event title or location."
        />
      <EventList items={responseEntities} />
    </div>
  );
}
