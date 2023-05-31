import axios, { AxiosError, AxiosResponse } from "axios";

const url = "http://localhost:8080/accounts/"

export const AccountAPI = {
    GetAccountById: (id: number): Promise<GetAccountResponse> => {
        return axios.get(url+id)
        .then((response) => {
            console.log(response.data);
            return response.data
        })
        .catch(error => console.log(error))
    },
    GetAccountByUsername: (username: string): Promise<GetAccountResponse> => {
        const concatURL = url+username;
        console.log("Searching: " + username + " at " + concatURL);
        return axios.get(concatURL, { headers: {Accept: 'application/json'}})
        .then((response) => {
            console.log("Succes. See network tab for payload.");
            return response.data.account;
        })
        .catch(error => {
            console.log("ERROR OCCURED: " + error)
        })
    },
    PostAccount: (username: string, password: string, email: string): Promise<CreateAccountResponse> =>{
        return axios.post(url, { username, password, email })
        .then(response => response.data)
        .catch(error => console.log(error))
    },
    UpdateAccount: (account: Account): Promise<UpdateAccountResponse> =>  {
        return axios.put(url + account.id)
        .then(response => {
            console.log("Updated " + account.username);
            return response.data;
        })
        .catch(error => console.log(error))
    }
}

export interface GetAccountResponse{
    account: Account;
}

export interface UpdateAccountResponse {
    targetId: number;
    username: string;
    password: string;
    email: string;
}

export interface CreateAccountResponse {
    id: number;
}

interface Account {
    id: number;
    username: string;
    password: string;
    email: string;
}

export interface GetAllAccountsResponse {
    accounts: Account[];
}