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
            Ticket Exchange
        </Link>
        <ul>
            <Anchor href="/events">Events</Anchor>
            {TokenManager.getAccessToken() ? <Anchor href="/profile">Profile</Anchor> : <Anchor href="/login">Log In</Anchor>}
            {!TokenManager.getAccessToken() && <Anchor href="/register">Register</Anchor>}
            {(TokenManager.getAccessToken() && TokenManager.getClaims()?.roles?.includes("ADMIN")) && <Anchor href="/eventmanagement">Manage Events</Anchor> }
            {(TokenManager.getAccessToken() && TokenManager.getClaims()?.roles?.includes("ADMIN")) && <Anchor href="/event/create">Create Event</Anchor>}
            {(TokenManager.getAccessToken() && TokenManager.getClaims()?.roles?.includes("ADMIN")) && <Anchor href="/statistics">Statistics</Anchor>}
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