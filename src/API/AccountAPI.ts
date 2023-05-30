import axios from "axios";

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
        .then(response => {
            console.log("Succes. See network tab for payload.")
            return response.data
        })
        .catch(error => {
            console.log("ERROR OCCURED: " + error)
        })
    },
    PostAccount: (account: Account): Promise<Object> =>{
        return axios.post(url)
        .then(response => response.data)
        .catch(error => console.log(error))
    }
}

export interface GetAccountResponse{
    account: Account;
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