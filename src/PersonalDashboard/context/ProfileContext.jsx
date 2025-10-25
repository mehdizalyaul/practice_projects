import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ProfileApi } from "../services/index";

export const ProfileContext = createContext();

const initialProfiles = [];

export default function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfiles = async () => {
      setError(null);
      setLoading(true);
      try {
        const data = await ProfileApi.getAllProfiles(token);
        setProfiles(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (token && user.role === "admin") fetchProfiles();
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{ profiles, setProfiles, loading, setLoading, error, setError }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
