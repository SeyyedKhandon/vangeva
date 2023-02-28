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
import AddPost from "./pages/AddPost";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-center" theme="dark" />
    </Router>
  );
}

export default App;
