import { useState, useCallback, useRef } from "react";
import Form from "./Form";
import Card from "./Card";

export default function ProfileCards() {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Developer");
  const [description, setDescription] = useState("");
  const totalRef = useRef(0);
  const handleAddProfile = useCallback(() => {
    if (!name.trim() || !role.trim() || !description.trim()) {
      return;
    }
    setProfiles((prevProfiles) => {
      return [...prevProfiles, { id: Date.now(), name, role, description }];
    });
    totalRef.current += 1;
    setName("");
    setRole("");
    setDescription("");
  }, [name, role, description]);

  const handleDeleteTask = useCallback((id) => {
    setProfiles((prevProfiles) => {
      return prevProfiles.filter((profile) => {
        return profile.id !== id;
      });
    });
    totalRef.current -= 1;
  }, []);

  return (
    <>
      <h1>Total Profiles: {profiles.length}</h1>
      <Form
        name={name}
        setName={setName}
        role={role}
        setRole={setRole}
        description={description}
        setDescription={setDescription}
        handleAddProfile={handleAddProfile}
      />
      <ul>
        {profiles &&
          profiles.map((profile) => {
            return (
              <Card
                image={<img src="avatar.png" />}
                footer={<button>Follow me</button>}
                key={profile.id}
              >
                <p>{profile.name}</p>
                <p>{profile.role}</p>
                <p>{profile.description}</p>
                <button onClick={() => handleDeleteTask(profile.id)}>
                  Delete
                </button>
              </Card>
            );
          })}
      </ul>
    </>
  );
}
