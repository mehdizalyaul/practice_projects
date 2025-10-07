import { useCallback, useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import "../styles/ProfilesPage.css";

export default function ProfilesPage() {
  const { profiles, setProfiles } = useContext(ProfileContext);
  const [name, setName] = useState("");

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
      <ProfileForm name={name} setName={setName} addProfile={addProfile} />

      <div className="profiles-list">
        {profiles && profiles.length > 0 ? (
          profiles.map((profile) => (
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
