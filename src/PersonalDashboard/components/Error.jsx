import "../styles/Error.css";

export default function Error({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="error-container">
      <p className="error-text">{message}</p>
    </div>
  );
}
