import axios, { AxiosError, AxiosResponse } from "axios";
import TokenManager from "./TokenManager";

const url = "http://localhost:8080/accounts/";

export const AccountAPI = {
  GetAccountById: (id: number): Promise<GetAccountResponse> => {
    return axios
      .get(`${url}id/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  },
  GetAccountByUsername: (username: string): Promise<GetAccountResponse> => {
    const concatURL = url + username;
    console.log("Searching: " + username + " at " + concatURL);
    return axios
      .get(concatURL, { headers: { Accept: "application/json" } })
      .then((response) => {
        return response.data.account;
      })
      .catch((error) => {
        console.log("ERROR OCCURED: " + error);
      });
  },
  PostAccount: (
    username: string,
    password: string,
    email: string
  ): Promise<CreateAccountResponse> => {
    return axios
      .post(url, { username, password, email })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
  UpdateAccount: (account: Account): Promise<UpdateAccountResponse> => {
    return axios
      .put(url + account.id)
      .then((response) => {
        console.log("Updated " + account.username);
        return response.data;
      })
      .catch((error) => console.log(error));
  },
  GetUsersByTicketsBought: (min: number): Promise<AccountRanking[]> => {
    const concatURL = url + `statistics/rank/buyers?min=${min}`;
    const token = TokenManager.getAccessToken();
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(concatURL, { headers })
      .then((response) => response.data.rankings)
      .catch((error) => console.log("Error reading statistics:", error));
  },
};

export interface GetAccountResponse {
  account: Account;
}

export interface UpdateAccountResponse {
  targetId: number;
  username: string;
  email: string;
}

export interface CreateAccountResponse {
  id: number;
}

export interface Account {
  id: number;
  username: string;
  email: string;
}

export interface GetMultipleAccountsResponse {
  accounts: Account[];
}

export interface AccountRanking {
  username: string;
  ticketCount: number;
}
