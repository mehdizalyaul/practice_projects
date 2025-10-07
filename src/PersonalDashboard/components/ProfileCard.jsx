import React from "react";
import "../styles/ProfilesPage.css";

function ProfileCard({ deleteProfile, profile }) {
  return (
    <div className="profile-card">
      <p className="profile-name">{profile.name}</p>
      <button className="delete-btn" onClick={() => deleteProfile(profile.id)}>
        Delete
      </button>
    </div>
  );
}

export default React.memo(ProfileCard);
