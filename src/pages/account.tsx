import "bootstrap/dist/css/bootstrap-grid.min.css"
import DelegateButton from "../components/DelegateButton";
import { AccountAPI, GetAccountResponse } from "../API/AccountAPI";
import { useState } from "react";


const HandleLoginClick = (username: string): Promise<GetAccountResponse> => {
    return AccountAPI.GetAccountByUsername(username)
}

export default function LoginPage(): JSX.Element {

    const [tbUsername, setUsername] = useState("");
    const [tbPassword, setPassword] = useState("");

    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1>Log in</h1>
                    <form>
                        <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)} autoComplete="current-username"/>
                        <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} autoComplete="current-password" />

                       <DelegateButton delegate={HandleLoginClick} args={[tbUsername]} buttonType="secondary">Log in</DelegateButton>
                    </form>
                </div>
            </div>
        </>
    );
}

export function RegisterPage(): JSX.Element {
    const [tbUsername, setUsername] = useState()
    return (
        <>
            <h1>Register</h1>
            <form>
                <input type="text" placeholder="username"/>
            </form>
        </>
    )
}