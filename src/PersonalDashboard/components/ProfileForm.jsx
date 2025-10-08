import { useEffect, useRef } from "react";
import React from "react";
import "../styles/ProfilesPage.css";

function ProfileForm({ addProfile, name, setName }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [addProfile]);

  return (
    <div className="profile-form">
      <input
        type="text"
        placeholder="Enter profile name"
        value={name}
        ref={inputRef}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addProfile}>Add</button>
    </div>
  );
}
export default React.memo(ProfileForm);
