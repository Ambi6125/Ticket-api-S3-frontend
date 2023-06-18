import DelegateButton from "../components/DelegateButton";

function Click() {
  const date: Date = new Date();
  console.log(
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  );
}

export default function HomePage(): JSX.Element {
  return (
    <div className="homeText">
      <br />
      <br />
      <h3>
        Welcome to ConcertTix.com: Your Gateway to Unforgettable Live Music
        Experiences{" "}
      </h3>
      <p>
        Discover the Hottest Concert Tickets for Music Lovers Worldwide At
        ConcertTix.com, we are passionate about connecting music lovers with
        their favorite artists. Explore our vast selection of concert tickets
        and immerse yourself in the electrifying atmosphere of live music.
        <br />
        <br />
        <br />
        <br />
        <h3>Unleash Your Passion for Music:</h3>
        Your One-Stop Destination for Concert Tickets Browse and
        Secure the Best Seats in Seconds With ConcertTix.com, finding and
        purchasing concert tickets has never been easier. Our user-friendly
        interface empowers you to effortlessly browse upcoming concerts, 
        and secure the best seats in mere seconds. Get ready to
        witness your favorite artists performing live, from intimate club shows
        to monumental stadium tours. 
        
        Stay in Tune with ConcertTix.com: Join Our
        Community and Unlock Exclusive Benefits Sign up for our newsletter today
        and become part of our vibrant community. Gain access to exclusive
        presales, special offers, and stay up-to-date with the latest concert
        announcements. Don't miss a beat – be the first to know about the
        hottest concerts in town. Experience the Magic of Live Music with
        ConcertTix.com. Your Ticket to Unforgettable Concert Experiences Starts
        Here!
      </p>
    </div>
  );
}
