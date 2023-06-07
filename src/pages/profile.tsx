import { useEffect, useState } from "react";
import { AccountAPI } from "../API/AccountAPI";
import TokenManager from "../API/TokenManager";
import { Account } from "../API/AccountAPI";
import { useNavigate } from "react-router";

export function Profile(): JSX.Element {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [userInfo, setUserInfo] = useState<Account | null>();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, [claims]);

  const getUserInfo = () => {
    const receivedClaims = TokenManager.getClaims();
    console.log(receivedClaims);
    if (
      receivedClaims?.roles?.includes("ADMIN" || "USER")
    ) {
      AccountAPI.GetAccountById(receivedClaims.accountId)
        .then((account) => setUserInfo(account.account))
        .catch((error) => console.error(error));
    }
  };

  function HandleLogout() {
    console.log("Logging out");
    TokenManager.clear();
    setClaims(null);
    setUserInfo(null);
    navigate("/login");
  }

  return (
    <>
      <h1>Profile</h1>
      <h2>Welcome, {userInfo?.username}</h2>

      <button onClick={HandleLogout}>Log out</button>
    </>
  );
}
