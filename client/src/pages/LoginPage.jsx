import { Link, Navigate, useOutletContext } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser, showNotification } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", { email, password });
      setUser(res.data.data.user);
      setRedirect(true);
      if (res.data.status === "success") {
        localStorage.setItem("authToken", res.data.token);
      }
      console.log("login successful:", res.data.data.user);
    } catch (error) {
      if (error.res) {
        // Error response from server
        showNotification(error.res.data.message || "An error occurred");
      } else {
        // Network or other errors
        showNotification("An error occurred");
      }
      console.error("login failed:", error);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex  flex-col min-h-screen items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>

        <form className="max-w-md  mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary">Login</button>

          <div className="flex gap-4 p-4 justify-center items-center w-full text-gray-500 text-center">
            <Link to={"/signup"}>Don&apos;t have an account?</Link>
            <Link to={"/forgotPassword"}>Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
