import jwtDecode from "jwt-decode"

interface UserData {
    accessToken?: string;
    claims?: any
}

interface ITokenManager {
    getAccessToken: () => string | undefined;
    getClaims: () => any | undefined;
    setAccessToken: (token: string) => any;
    clear: () => void;
    logClaims: () => void;
  }


  const userData: UserData = {
    accessToken: undefined,
    claims: undefined,
  };


  // const TokenManager: ITokenManager = {
  //   getAccessToken: () => userData.accessToken,
  //   getClaims: () => {
  //     if (!userData.claims) {
  //       return undefined;
  //     }
  //     return userData.claims;
  //   },
  //   setAccessToken: (token: string) => {
  //     userData.accessToken = token;
  //     const claims = jwt_decode(token);
  //     userData.claims = claims;
  //     return claims;
  //   },
  //   clear: () => {
  //     userData.accessToken = undefined;
  //     userData.claims = undefined;
  //   },

  //   logClaims: () => {
  //       console.log(userData?.claims);
  //   }
  // };


  const TokenManager = {
    getAccessToken: () => localStorage.getItem("accessToken"),
    getClaims: () => {
      if (!localStorage.getItem("claims")) {
        return undefined;
      }
      return JSON.parse(localStorage.getItem("claims")!);
    },
    setAccessToken: (token: string | null) => {
      if (!token) {
        return null;
      }
      localStorage.setItem("accessToken", token);
      const claims = jwtDecode(token ?? '');
      localStorage.setItem("claims", JSON.stringify(claims));
      return claims;
    },
    clear: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("claims");
      localStorage.removeItem("account");
    },
    isAuthenticated: () =>{
      if (!localStorage.getItem("accessToken")) {
        return false;
      }
      else{
        return true;
      }
    }
  };
  



export default TokenManager