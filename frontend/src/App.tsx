import "@picocss/pico";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
function App() {
  return (
    <Router>
      <main className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        <ToastContainer position="bottom-center" theme="dark" />
      </main>
    </Router>
  );
}

export default App;
