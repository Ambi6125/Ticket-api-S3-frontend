import axios from "axios";

const url = "http://localhost:8080/events/";

export const EventAPI = {
  GetEventById: (id: number): Promise<GetEventRequest> => {
    return axios
      .get(url + id.toString())
      .then((response) => {
        console.log("Received: " + response);
        return response.data.event;
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
};

export interface EventObject {
  id: number;
  title: string;
  location: string;
  moment: Date;
  totalTickets: number;
  remainingTickets: number;
}

export interface GetEventRequest {
  event: EventObject;
}

export default EventAPI;
