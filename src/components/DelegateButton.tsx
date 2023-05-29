import { ReactNode } from "react";

interface DelegateButtonProps {
    children: ReactNode;
    delegate: (...args: any[]) => any;
    buttonType?: "primary" | "secondary" | "waning"
}


export default function DelegateButton({ children, delegate, buttonType = "primary" }: DelegateButtonProps) {
    return <button className={"button button-"+buttonType}>{children}</button>
}