import axios from "axios";

const url = "https://localhost:8080/accounts/"

export const AccountAPI = {
    GetAccountById: (id: number): Promise<GetAccountResponse> => {
        return axios.get(url+id)
        .then(response => response.data)
        .catch(error => console.log(error))
    },
    GetAccountByUsername: (username: string): Promise<GetAccountResponse> => {
        return axios.get(url+username)
        .then(response => response.data)
        .catch(error => console.log(error))
    }
}

export interface GetAccountResponse{
    id: number;
    username: string;
    email: string;
}