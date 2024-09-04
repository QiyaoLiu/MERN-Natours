import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { usePreviousLocation } from "./usePreviousLocation";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation();

  function handleLogout() {
    // Clear user data (you can also add more log out logic here)
    setUser(null);
    // Redirect to the home or login page
    navigate(previousLocation === "/users/me" ? "/" : previousLocation);
  }

  return (
    <header className="flex justify-between items-center bg-primary py-2">
      <Link className="text-white mx-8 text-xl" to={"/"}>
        All Tours
      </Link>

      <div className="logo py-2">
        <img src="/img/logo-white.png" alt="Logo" className="w-12 h-10" />
      </div>
      {user ? (
        <div className="flex text-white items-center ">
          <Link className="text-white items-center" to={"users/me"}>
            {user.name}
          </Link>
          <button
            onClick={handleLogout}
            className="border border-gray-300 rounded-full shadow-md px-4 py-1 text-white text-center inline-block mx-8"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex gap-4 text-white my-4">
          <Link to={"users/login"}>LOG IN</Link>
          <Link
            to="users/signup"
            className="border border-gray-300 rounded-full shadow-md px-4 text-center inline-block mr-8"
          >
            SIGN UP
          </Link>
        </div>
      )}
    </header>
  );
}
