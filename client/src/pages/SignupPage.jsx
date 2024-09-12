import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [roles, setRoles] = useState([]);
  const { showNotification, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users/roles")
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        showNotification(
          error.response?.data?.message ||
            "An error occurred while fetching roles."
        );
      });
  }, [showNotification]);

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
        role,
      });

      console.log("Signup successful:", res.data.data);

      // Check if the response indicates success and includes a token
      if (res.status === "success") {
        // Store the token in localStorage using the key "authToken"
        localStorage.setItem("authToken", res.token);

        // Optionally, update the user context with logged-in user details
        const { user } = res.data.user;
        setUser({
          name: user.name,
          email: user.email,
          role: user.role,
          isLoggedIn: true,
        });

        // Redirect the user to the home page after successful signup and login
        navigate("/");
      } else {
        // Handle any other response status
        showNotification("Signup successful but login failed. Please log in.");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data);
      showNotification(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="mt-4 grow flex flex-col min-h-screen items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Sign Up</h1>
        <form className="max-w-md mx-auto" onSubmit={signup}>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Please enter your password again"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <div className="flex py-2">
            <h3 className="py-2 px-4">Role:</h3>
            <select
              className="border mx-2 py-2 px-2 rounded-2xl"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((roleOption, index) => (
                <option value={roleOption} key={index}>
                  {roleOption}
                </option>
              ))}
            </select>
          </div>

          <button className="primary">Sign Up</button>
          <div className="flex gap-4 p-4 justify-between w-full text-grey-500">
            <Link to={"/login"}>Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
