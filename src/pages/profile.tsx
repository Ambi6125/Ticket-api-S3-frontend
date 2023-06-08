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
    if (!TokenManager.getAccessToken()) {
      navigate("/login");
    }
    getUserInfo();
  }, [claims]);

  const getUserInfo = () => {
    const receivedClaims = TokenManager.getClaims();

    if (
      receivedClaims?.roles?.includes("ADMIN") ||
      receivedClaims?.roles.includes("USER")
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
      <div className="profile-page-container">
        <div className="profile-container">
          <h1>Profile</h1>
          < br/>
          < br/>
          <h2>Welcome, {userInfo?.username}</h2>
          <h3>Email: {userInfo?.email}</h3>
        </div>

        <div className="my-ticket-container">
          <h2>My tickets</h2>
        </div>

        <button className="standard-button" onClick={HandleLogout}>Log out</button>
      </div>
    </>
  );
}
