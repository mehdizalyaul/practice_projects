import { useCallback, useContext, useState, useRef, useMemo } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import "../styles/ProfilesPage.css";
import { NotificationContext } from "../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { data } from "react-router-dom";
import { addProfileApi } from "../services/api";
import { AuthContext } from "../context/AuthContext";

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
      const newProfile = await addProfileApi(token, name);
      if (!newProfile.res.ok) {
        const message = newProfile.data.errors
          ? newProfile.data.errors[0].msg
          : "Something went wrong";
        const err = new Error(message);
        err.response = newProfile.data;
        throw err;
      }
      setProfiles((prevProfiles) => {
        return [...prevProfiles, newProfile.data];
      });
      showNotification("Profile added successfully!", "success");

      setName("");
    } catch (error) {
      console.error("Fail to fetch add profile", error);
      setError(error.response.errors[0].msg);
    } finally {
      setLoading(false);
    }
  }, [name, showNotification]);

  const deleteProfile = useCallback(
    async (id) => {
      setError(null);
      setLoading(true);

      try {
        await fetch(`http://localhost:5000/profiles/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

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

  if (loading) return <Spinner />;

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
