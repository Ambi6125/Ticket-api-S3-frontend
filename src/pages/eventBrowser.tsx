import EventList from "../components/Events";
import SearchBar from "../components/SearchBar";
import EventAPI, { EventObject } from "../API/EventAPI";
import { useState, useEffect } from "react";

/**
 * Resembles a page to browse and search available events, such as concerts.
 * @returns A page component to browse through EventObjects.
 */
export default function EventBrowser(): JSX.Element {
  const [responseEntities, setResponseEntities] = useState<EventObject[]>([]);

  useEffect(() => {
    // Fetch and set 6 random events when page first renders
    EventAPI.GetRandom().then((response) => {
      const resultArray: EventObject[] = response.events;
      setResponseEntities(resultArray);
    });
  }, []);

  const putReceivedDataInUseState = (data: any) => {
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
