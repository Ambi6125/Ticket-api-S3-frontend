import DelegateButton from "../components/DelegateButton";

function Click() {
  const date: Date = new Date();
  console.log(
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  );
}

export default function HomePage(): JSX.Element {
  return (
    <>
      <h1>Home</h1>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        minima eveniet vitae obcaecati atque nobis labore aperiam repellat amet
        totam. Aperiam quos quis sint ut architecto sequi similique nam
        repellat.
      </p>
    </>
  );
}
