import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

interface DelegateButtonProps<TResult> {
    children: ReactNode;
    delegate: (...args: any[]) => TResult
    args?: any[]
    buttonType?: "primary" | "secondary" | "waning"
}


export default function DelegateButton<T>({ children, delegate, args = [], buttonType = "primary" }: DelegateButtonProps<T>) {

    const handleClick = () => {
        delegate(...args);
    }

    return <button type="button" className={"button button-"+buttonType} onClick={handleClick}>{children}</button>
}