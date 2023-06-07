import { Children, ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenManager from "../API/TokenManager";


export default function Navbar() {

    const navigate = useNavigate();
    const [claims, setClaims] = useState(TokenManager.getClaims());

    const HandleLogout = () => {
        TokenManager.clear();
        setClaims(null);
        navigate("/");
    }

    return (
    <nav className="nav">
        <Link to="/" className="site-title">
            Ticket Exhange
        </Link>
        <ul>
            <Anchor href="/events">Events</Anchor>
            {TokenManager.getAccessToken() ? <button onClick={HandleLogout}>Log out</button> : <Anchor href="/login">Log In</Anchor>}
            <Anchor href="/register">Register</Anchor>
        </ul>
    </nav>
    )
}


interface CustomLinkProps {
    href: string;
    children: ReactNode;
}

function Anchor({href, children}: CustomLinkProps): JSX.Element {
    const activePath = window.location.pathname;
    return (
        <li className={activePath === href ? "active" : ""}>
            <Link to={href}>
                {children}
            </Link>
        </li>
    )
}