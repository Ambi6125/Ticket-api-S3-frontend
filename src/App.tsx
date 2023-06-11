import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage, { RegisterPage } from "./pages/account";
import "./designers/styles.css";
import { EventPage } from "./pages/eventPage";
import { Profile } from "./pages/profile";
import EventBrowser from "./pages/eventBrowser";
import BuyTicketsPage from "./pages/buytickets";
import { EventManagementOldComponent } from "./components/EventCreator";
import EventManagementPage from "./pages/eventManagementPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventBrowser />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/event/:id/tickets" element={<BuyTicketsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/eventmanagement"
            element={<EventManagementPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
