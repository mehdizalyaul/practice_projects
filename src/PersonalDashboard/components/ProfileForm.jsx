import { useEffect, useRef } from "react";
import React from "react";

function TaskForm({ addProfile, name, setName }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [addProfile]);

  return (
    <>
      <input
        type="text"
        value={name}
        ref={inputRef}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addProfile}>Add Profile</button>
    </>
  );
}
export default React.memo(TaskForm);
