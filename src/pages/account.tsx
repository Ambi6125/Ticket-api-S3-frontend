import "bootstrap/dist/css/bootstrap-grid.min.css"
import DelegateButton from "../components/DelegateButton";


function LogIn() {
    return null;
}

export default function LoginPage(): JSX.Element {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1>Log in</h1>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />

                        <DelegateButton buttonType="primary" delegate={LogIn}>Log in</DelegateButton>
                    </form>
                </div>
            </div>
        </>
    );
}

export function RegisterPage(): JSX.Element {
    return <h1>Register</h1>
}