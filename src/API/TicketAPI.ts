import axios from "axios";
import TokenManager from "./TokenManager";

const url: string = "http://localhost:8080/tickets/";

export interface BuyTicketsRequest {
  buyerId: number;
  eventId: number;
  amount: number;
}

export interface BuyTicketsResponse {
  ids: number[];
}

export interface EventTicketCountDTO {
  eventTitle: String;
  ticketCount: number;
}

export const TicketAPI = {
  BuyTickets: (request: BuyTicketsRequest): Promise<BuyTicketsResponse> => {
    const token = TokenManager.getAccessToken();
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    return axios
      .post(`${url}buy`, request, { headers })
      .then((response) => response.data)
      .catch((error) => console.log("Error buying tickets:", error));
  },

  GetTicketsFromUser: (accountId: number) => {
    return axios
      .get(`${url}user/${accountId}`)
      .then((response) => response.data.results)
      .catch((error) => console.log(error));
  },
};
