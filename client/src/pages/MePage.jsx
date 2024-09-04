import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function MePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { ready, user, showNotification } = useContext(UserContext);
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  if (!ready) {
    return "loading...";
  }
  if (ready && !user) {
    showNotification("You need to log in to access this page.");
    return <Navigate to={"/users/login"} />;
  }
  const isAdmin = user?.role === "admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.patch(
        "/users/updateMe",
        {
          name,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming the response data structure contains a `message`
      showNotification("Settings updated successfully!");
      // Optionally, update user context with new data
    } catch (error) {
      // Handle error response and show notification
      if (error.response && error.response.data) {
        showNotification(`Error: ${error.response.data.message}`);
      } else {
        showNotification("Failed to update settings. Please try again.");
      }
    }
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (password !== passwordConfirm) {
      showNotification("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.patch(
        "/users/updateMyPassword",
        {
          passwordCurrent,
          password,
          passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        showNotification("Password updated successfully!");
        // Optionally clear password fields
        setPasswordCurrent("");
        setPassword("");
        setPasswordConfirm("");
      } else {
        showNotification(`Error: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        showNotification(`Error: ${error.response.data.message}`);
      } else {
        showNotification("Failed to update password. Please try again.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] flex-1 z-10 max-w-screen-lg w-full">
      <div className="bg-primary px-16 pt-16 pb-16 flex flex-col">
        <nav className=" flex flex-col mt-4 gap-4">
          <Link className="py-2 bg-primary text-white    " to={"/users/"}>
            <div className="flex">
              <svg className="w-6 h-6 mr-4" fill="#ffffff">
                <use xlinkHref="/img/icons.svg#icon-settings" />
              </svg>
              <span> SETTINGS</span>
            </div>
          </Link>
          <Link className="py-2 bg-primary text-white   " to={"/users/"}>
            <div className="flex">
              <svg className="w-6 h-6 mr-4 " fill="#ffffff">
                <use xlinkHref="/img/icons.svg#icon-briefcase" />
              </svg>
              <span> MY BOOKINGS</span>
            </div>
          </Link>
          <Link className="py-2 bg-primary text-white   " to={"/users/"}>
            <div className="flex">
              <svg className="w-6 h-6 mr-4 " fill="#ffffff">
                <use xlinkHref="/img/icons.svg#icon-star" />
              </svg>
              <span> MY REVIEWS</span>
            </div>
          </Link>
          <Link className="py-2 bg-primary text-white   " to={"/users/"}>
            <div className="flex">
              <svg className="w-6 h-6 mr-4 " fill="#ffffff">
                <use xlinkHref="/img/icons.svg#icon-credit-card" />
              </svg>
              <span> BILLING</span>
            </div>
          </Link>

          {isAdmin && (
            <>
              <p className="mt-6  text-sm text-white font-semibold">ADMIN</p>
              <hr className="mb-4 border-gray-300" />{" "}
              <Link className="py-2 bg-primary text-white   " to={"/users/"}>
                <div className="flex">
                  <svg className="w-6 h-6 mr-4 " fill="#ffffff">
                    <use xlinkHref="/img/icons.svg#icon-map" />
                  </svg>
                  <span> MANAGE TOURS</span>
                </div>
              </Link>
              <Link className="py-2 bg-primary text-white   " to={"/users/"}>
                <div className="flex">
                  <svg className="w-6 h-6 mr-4 " fill="#ffffff">
                    <use xlinkHref="/img/icons.svg#icon-users" />
                  </svg>
                  <span> MANAGE USERS</span>
                </div>
              </Link>
              <Link className="py-2 bg-primary text-white   " to={"/users/"}>
                <div className="flex">
                  <svg className="w-6 h-6 mr-4 " fill="#ffffff">
                    <use xlinkHref="/img/icons.svg#icon-star" />
                  </svg>
                  <span> MANAGE REVIEWS</span>
                </div>
              </Link>
              <Link className="py-2 bg-primary text-white   " to={"/users/"}>
                <div className="flex">
                  <svg className="w-6 h-6 mr-4 " fill="#ffffff">
                    <use xlinkHref="/img/icons.svg#icon-briefcase" />
                  </svg>
                  <span>MANAGE BOOKINGS</span>
                </div>
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="mb-64">
        <h1 className="text-2xl text-center my-8"> YOUR ACCOUNT SETTING</h1>

        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            placeholder={user.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <label className="block mb-2">Email Address</label>
          <input
            type="email"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="border border-gray-300 rounded-full shadow-md px-4 py-2 my-4 bg-primary text-white text-center inline-block"
          >
            SAVE SETTINGS
          </button>
        </form>
        <h1 className="text-2xl text-center my-8"> CHANGE MY PASSWORD</h1>
        <form className="max-w-md mx-auto" onSubmit={handlePasswordChange}>
          <label className="block mb-2">Current Password</label>
          <input
            type="password"
            value={passwordCurrent}
            onChange={(e) => setPasswordCurrent(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <label className="block mb-2">Confirm New Password</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="border border-gray-300 rounded-full shadow-md px-4 py-2 my-4 bg-primary text-white text-center inline-block"
          >
            SAVE NEW PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}
