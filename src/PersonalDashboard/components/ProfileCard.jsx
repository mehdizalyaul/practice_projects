import React from "react";
import "../styles/ProfilesPage.css";
// import profileImage from "../../../public/profile.jpg";
import { motion, AnimatePresence } from "framer-motion";

function ProfileCard({ profile, deleteProfile }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-card"
      >
        <img src={"profile.png"} alt="" />

        <p>{profile.name}</p>
        <div className="profile-buttons">
          <button
            className="delete-button"
            onClick={() => deleteProfile(profile.id)}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default React.memo(ProfileCard);
