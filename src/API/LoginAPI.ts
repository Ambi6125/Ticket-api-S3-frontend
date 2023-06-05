import axios from "axios";
import TokenManager from "./TokenManager";

const url: string = "http://localhost:8080/login";

interface LoginResponse {
  accessToken: string;
}


export const LoginAPI = {
  login: (username: string, password: string): Promise<unknown> => {
    return axios
      .post(url, { username, password }, { headers: {Accept: 'application/json'}})
      .then((response) => response.data.accessToken)
      .then((accessToken) => TokenManager.setAccessToken(accessToken));
  },
};
