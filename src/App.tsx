import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home";
import LoginPage, { RegisterPage } from "./pages/account";
import "./designers/styles.css"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element= {<LoginPage />} />
          <Route path="/register" element= {<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;