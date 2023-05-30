import DelegateButton from "../components/DelegateButton";

function Click() {
    const date: Date = new Date();
    console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
}

export default function HomePage(): JSX.Element {
    
    return (
        <>
            <h1>Home</h1>
            <DelegateButton<void> delegate={Click}>
                Click to test log
            </DelegateButton>
        </>
    )
}