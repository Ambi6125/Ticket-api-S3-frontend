import axios from "axios";
import { constant } from "cypress/types/lodash";

const url = "http://localhost:8080/events/";

export const EventAPI = {
  GetEventById: (id: number): Promise<GetEventRequest> => {
    return axios
      .get(url + id.toString())
      .then((response) => {
        console.log("Received: " + response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  GetEventByTitle: (title: string): Promise<GetEventRequest> => {
    const concatURL = url + title;
    return axios
      .get(concatURL)
      .then((response) => {
        console.log("Received: " + response.data);
        return response.data.event;
      })
      .catch((error) => console.log(error));
  },
  GetEventByLocation: (location: string): Promise<GetEventRequest> => {
    const concatURL = url + "location/" + location;
    return axios
      .get(concatURL)
      .then((response) => {
        console.log("Receive: " + response.data);
        return response.data.event;
      })
      .catch((error) => console.log(error));
  },
  GetEventsOnSearch: (text: string): Promise<GetEventsResponse> => {
    const concatURL = url + "search/" + text;
    return axios
      .get(concatURL, { headers: { Accept: "application/json" } })
      .then((response) => {
        const resultArray: any = response.data.events;
        console.log(resultArray);
        return resultArray;
      })
      .catch((error) => console.log(error));
  },

  CreateEvent: (title: string, location: string, moment: Date, totalTickets: number ): Promise<CreateEventResponse> => {
    return axios
    .post(url, {title, location, moment, totalTickets}, { headers: { Accept: "application/json" } })
    .then((response) => {
      return response.data;
    })
    .catch(error => console.log(error)
    );
  },
};

export interface EventObject {
  id: number;
  title: string;
  artist: string;
  location: string;
  moment: Date;
  totalTickets: number;
  remainingTickets: number;
}

export interface GetEventRequest {
  event: EventObject;
}

export interface GetEventsResponse {
  events: EventObject[];
}

interface CreateEventResponse {
  id: number;
}

export default EventAPI;
