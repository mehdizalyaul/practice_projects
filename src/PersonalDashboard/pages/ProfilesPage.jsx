import { useCallback, useContext, useState, useRef, useMemo } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import "../styles/ProfilesPage.css";
import { NotificationContext } from "../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { AuthContext } from "../context/AuthContext";
import { ProfileApi } from "../services/index";

export default function ProfilesPage() {
  const { profiles, setProfiles, error, setError, loading, setLoading } =
    useContext(ProfileContext);
  const [name, setName] = useState("");
  const searchInputRef = useRef("");
  const [search, setSearch] = useState("");
  const { showNotification } = useContext(NotificationContext);
  const { token } = useContext(AuthContext);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) =>
      profile.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [profiles, search]);

  const addProfile = useCallback(async () => {
    if (name.trim() === "") return;

    setError(null);
    setLoading(true);

    try {
      const newProfile = await ProfileApi.addProfile(token, name);

      setProfiles((prevProfiles) => [...prevProfiles, newProfile]);

      showNotification("Profile added successfully!", "success");

      setName("");
    } catch (error) {
      console.error("Fail to fetch add profile:", error.message);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [name, token, showNotification]);

  const deleteProfile = useCallback(
    async (id) => {
      setError(null);
      setLoading(true);

      try {
        await ProfileApi.deleteProfile(token, id);

        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile.id !== id)
        );
        showNotification("Profile deleted!", "error");
      } catch (error) {
        console.error("Fail to delete a profile", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [showNotification]
  );

  if (loading) {
    return <Spinner />;
  }

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
        {error && <Error message={error} />}

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
