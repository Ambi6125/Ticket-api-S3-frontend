import jwt_decode from "jwt-decode"

interface UserData {
    accessToken?: string;
    claims?: any
}

interface ITokenManager {
    getAccessToken: () => string | undefined;
    getClaims: () => any | undefined;
    setAccessToken: (token: string) => any;
    clear: () => void;
  }


  const userData: UserData = {
    accessToken: undefined,
    claims: undefined,
  };


  const TokenManager: ITokenManager = {
    getAccessToken: () => userData.accessToken,
    getClaims: () => {
      if (!userData.claims) {
        return undefined;
      }
      return userData.claims;
    },
    setAccessToken: (token: string) => {
      userData.accessToken = token;
      const claims = jwt_decode(token);
      userData.claims = claims;
      return claims;
    },
    clear: () => {
      userData.accessToken = undefined;
      userData.claims = undefined;
    },
  };


export default TokenManager