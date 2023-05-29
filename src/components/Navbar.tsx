import { Children, ReactNode } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
    return (
    <nav className="nav">
        <Link to="/" className="site-title">
            Ticket Exhange
        </Link>
        <ul>
            <Anchor href="/login">Log In</Anchor>
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