import { useEffect, useRef } from "react";
import React from "react";
import "../styles/ProfilesPage.css";
import { motion, AnimatePresence } from "framer-motion";

function ProfileForm({ addProfile, name, setName }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [addProfile]);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="profile-form"
    >
      <input
        type="text"
        placeholder="Enter profile name"
        value={name}
        ref={inputRef}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addProfile}>Add</button>
    </motion.div>
  );
}
export default React.memo(ProfileForm);
