import { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext();

const initialProfiles = [];

export default function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProfiles = async () => {
      setError(null);
      setLoading(false);
      try {
        const res = await fetch("http://localhost:5000/profiles");

        const data = res.json();
        setProfiles(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err);
      } finally {
        setLoading(true);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profiles, setProfiles, loading, setLoading, error, setError }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
