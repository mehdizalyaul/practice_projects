import { useReducer } from "react";

const initialState = {
  values: { name: "", email: "", password: "" },
  errors: { name: "", email: "", password: "" },
};
export default function FormReducerExample() {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  function formReducer(state, action) {
    switch (action.type) {
      case "UPDATE_FIELD":
        return {
          ...state,
          values: { ...state.values, [action.field]: action.value },
        };

      case "SET_ERRORS":
        return { ...state, errors: action.payload };

      case "RESET":
        // TODO: return all fields empty
        return {
          values: { name: "", email: "", password: "" },
          errors: { name: "", email: "", password: "" },
        };

      default:
        return state;
    }
  }

  function validate(values) {
    const errors = { name: "", email: "", password: "" };

    if (values.name.length < 3) {
      errors.name = "min 3 characters";
    }
    if (!values.email.includes("@")) {
      errors.email = "must include @";
    }
    if (values.password.length < 6) {
      errors.password = "min 6 characters";
    }
    return errors;
  }

  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  function handleSubmit() {
    const result = validate(formState.values);
    if (result.name === "" && result.email === "" && result.password === "") {
      alert("Success");
      dispatch({ type: "RESET" });
      return;
    }
    dispatch({ type: "SET_ERRORS", payload: result });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Registration Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formState.values["name"]}
        onChange={(e) => handleChange(e)}
      />
      {formState.errors["name"] ? <span>{formState.errors["name"]}</span> : ""}
      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formState.values["email"]}
        onChange={(e) => handleChange(e)}
      />
      {formState.errors["email"] ? (
        <span>{formState.errors["email"]}</span>
      ) : (
        ""
      )}
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formState.values["password"]}
        onChange={(e) => handleChange(e)}
      />
      {formState.errors["password"] ? (
        <span>{formState.errors["password"]}</span>
      ) : (
        ""
      )}
      <br />

      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}
