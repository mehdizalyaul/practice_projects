import React from "react";
import "../styles/ProfilesPage.css";
import profileImage from "../../../public/profile.jpg";
function ProfileCard({ profile, deleteProfile }) {
  return (
    <div className="profile-card">
      <img src={profileImage} alt="" />

      <p>{profile.name}</p>
      <div className="profile-buttons">
        <button
          className="delete-button"
          onClick={() => deleteProfile(profile.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProfileCard);
