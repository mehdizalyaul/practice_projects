import { useCallback, useContext, useState, useRef, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import "../styles/ProfilesPage.css";
import { NotificationContext } from "../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilesPage() {
  const { profiles, setProfiles } = useContext(ProfileContext);
  const [name, setName] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(profiles || []);
  const searchInputRef = useRef("");
  const [search, setSearch] = useState("");
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    const filtered = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }, [profiles, search]);

  const addProfile = useCallback(async () => {
    if (name.trim() === "") return;
    const res = await fetch(`http://localhost:5000/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const newProfile = await res.json();
    setProfiles((prevProfiles) => {
      return [...prevProfiles, newProfile];
    });
    showNotification("Profile added successfully!", "success");

    setName("");
  }, [name, showNotification]);

  const deleteProfile = useCallback(
    async (id) => {
      await fetch(`http://localhost:5000/profiles/${id}`, {
        method: "DELETE",
      });

      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== id)
      );
      showNotification("Profile deleted!", "error");
    },
    [showNotification]
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="profiles-container"
      >
        <h1>Profiles Page</h1>
        <input
          type="text"
          placeholder="Search profiles..."
          ref={searchInputRef}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ProfileForm name={name} setName={setName} addProfile={addProfile} />

        <div className="profiles-list">
          {filteredProfiles && filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                deleteProfile={deleteProfile}
              />
            ))
          ) : (
            <p className="empty-message">No profiles yet.</p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
