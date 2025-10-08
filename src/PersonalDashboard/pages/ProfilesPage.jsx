import { useCallback, useContext, useState, useRef, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import "../styles/ProfilesPage.css";

export default function ProfilesPage() {
  const { profiles, setProfiles } = useContext(ProfileContext);
  const [name, setName] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(profiles || []);
  const searchInputRef = useRef("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
    const filtered = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }, [profiles, search]);

  const addProfile = useCallback(() => {
    if (name.trim() === "") return;
    const newProfile = { id: Date.now(), name };
    setProfiles([...profiles, newProfile]);
    setName("");
  }, [name, profiles, setProfiles]);

  const deleteProfile = useCallback(
    (id) => {
      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== id)
      );
    },
    [setProfiles]
  );

  return (
    <div className="profiles-container">
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
    </div>
  );
}
