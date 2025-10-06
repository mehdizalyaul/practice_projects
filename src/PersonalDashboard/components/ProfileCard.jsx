import React from "react";

function ProfileCard({ deleteProfile, profile }) {
  return (
    <div style={{ border: "1px solid black" }}>
      <img src="avatar.png" alt={profile.name} />
      <p>{profile.name}</p>
      <button onClick={() => deleteProfile(profile.id)}>Delete</button>
    </div>
  );
}

export default React.memo(ProfileCard);
