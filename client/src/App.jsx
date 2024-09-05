import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import TourPage from "./pages/TourPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MePage from "./pages/MePage.jsx";
import Layout from "./Layout.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
import Notification from "./Notification.jsx";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://mern-natours-backend.onrender.com/api/v1" // Use deployed backend URL
    : "http://localhost:8000/api/v1"; // Local development backend
axios.defaults.withCredentials = true;

function App() {
  const [notification, setNotification] = useState("");
  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(""), 5000); // Hide after 5 seconds
  }

  return (
    <UserContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/tours/:id/:slug?" element={<TourPage />} />
            <Route path="/users/login" element={<LoginPage />} />
            <Route path="/users/signup" element={<SignupPage />} />
            <Route path="/users/me" element={<MePage />} />
          </Route>
        </Routes>
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification("")}
          />
        )}
      </div>
    </UserContextProvider>
  );
}

export default App;
