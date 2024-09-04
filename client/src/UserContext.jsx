import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import Notification from "./Notification.jsx";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("users/me");
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setReady(true);
      }
    };

    fetchUser();
  }, []);

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(""), 5000); // Hide after 5 seconds
  }

  return (
    <UserContext.Provider value={{ user, setUser, ready, showNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification("")}
        />
      )}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
