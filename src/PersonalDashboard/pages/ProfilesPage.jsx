import { useCallback, useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";

export default function ProfilesPage() {
  const { profiles, setProfiles } = useContext(ProfileContext);
  const [name, setName] = useState("");

  const addProfile = useCallback(() => {
    if (name.trim() === "") {
      return;
    }
    const newProfile = { id: Date.now(), name: name };
    setProfiles([...profiles, newProfile]);
    setName("");
  });

  const deleteProfile = useCallback((id) => {
    setProfiles((prevProfiles) =>
      prevProfiles.filter((profile) => {
        return profile.id !== id;
      })
    );
  });

  return (
    <div>
      <h1>Profiles Page </h1>
      <div>
        <ProfileForm name={name} setName={setName} addProfile={addProfile} />
        {profiles &&
          profiles.map((profile) => {
            return (
              <ProfileCard
                key={profile.id}
                profile={profile}
                deleteProfile={deleteProfile}
              />
            );
          })}
      </div>
    </div>
  );
}
