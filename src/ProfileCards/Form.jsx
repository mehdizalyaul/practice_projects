import React from "react";

function FormComponent({
  name,
  setName,
  role,
  setRole,
  handleAddProfile,
  description,
  setDescription,
}) {
  return (
    <div id="profile">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        name="role"
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Developer">Developer</option>
        <option value="IT Support">IT Support</option>
        <option value="Data Analyst">Analyst</option>
      </select>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddProfile}>Add Profile</button>
    </div>
  );
}
const Form = React.memo(FormComponent);

export default Form;
