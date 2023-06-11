import axios, { AxiosResponse } from "axios";
import { useMemo } from "react";
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
        console.log("Response:");
        console.log(response);
        console.log("Response.data:");
        console.log(response.data);
        console.log("Response.data.events:");
        console.log(response.data.events);
        
        const resultArray: any = response.data.events;
        return resultArray;
      })
      .catch((error) => console.log(error));
  },

  GetAll: (): Promise<GetEventsResponse> => {
    return axios
      .get(url, { headers: { Accept: "application/json" } })
      .then((response) => {
        console.log("Response:");
        console.log(response); //Output: {data: {…}, status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
        console.log("Response.data:");
        console.log(response.data); //Output: {events: Array(16)}
        console.log("Response.data.events:");
        console.log(response.data.events); //Output: (16) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        

        const resultArray: any = response.data;
        return resultArray;
      })
      .catch((error) => console.log(error));
  },

  CreateEvent: (
    title: string,
    location: string,
    moment: Date,
    totalTickets: number
  ): Promise<CreateEventResponse> => {
    return axios
      .post(
        url,
        { title, location, moment, totalTickets },
        { headers: { Accept: "application/json" } }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  },

  UpdateEvent: (object: EventObject): Promise<AxiosResponse<any>> => {
    return axios
      .put(url, object, { headers: { Accept: "application/json" } })
      .then((response) => response)
      .catch((error) => error);
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

export interface GetEventsResponse {
  events: EventObject[];
}

interface CreateEventResponse {
  id: number;
}

export default EventAPI;
