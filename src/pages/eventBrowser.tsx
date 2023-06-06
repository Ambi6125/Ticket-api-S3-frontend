import EventList from "../components/Events";
import SearchBar from "../components/SearchBar";
import EventAPI, { EventObject } from "../API/EventAPI";
import { useState } from "react";

/**
 * Resembles a page to browse and search available events, such as concerts.
 * @returns A page component to browse through EventObjects.
 */
export default function EventBrowser(): JSX.Element {
  const [events, setEvents] = useState<EventObject[]>([]);

  const handleSearch = async (searchText: string): Promise<EventObject[]> => {
    const searchResults = await EventAPI.GetEventsOnSearch(searchText);
    return searchResults.events;
  };

  return (
    <div>
      <div className="box-with-shadow">
        <SearchBar<EventObject[]>
          searchMethod={handleSearch}
          onSubmit={(searchResults) => setEvents(searchResults)}
        />
      </div>
      <EventList items={events} />
    </div>
  );
}
