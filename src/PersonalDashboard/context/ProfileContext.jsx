import { createContext, useState } from "react";

export const ProfileContext = createContext();

export default function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState([]);

  return (
    <ProfileContext.Provider value={{ profiles, setProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
}
