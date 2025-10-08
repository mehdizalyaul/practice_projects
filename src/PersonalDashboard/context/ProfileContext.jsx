import { createContext, useState } from "react";

export const ProfileContext = createContext();

const initialProfiles = JSON.parse(localStorage.getItem("profiles")) || [];

export default function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(initialProfiles);

  return (
    <ProfileContext.Provider value={{ profiles, setProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
}
