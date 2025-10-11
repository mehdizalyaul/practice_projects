import { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext();

const initialProfiles = [];

export default function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(initialProfiles);

  useEffect(() => {
    fetch("http://localhost:5000/profiles")
      .then((res) => res.json())
      .then((data) => setProfiles(data));
  }, []);
  return (
    <ProfileContext.Provider value={{ profiles, setProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
}
