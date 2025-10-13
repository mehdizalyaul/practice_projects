import "../styles/Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div
        className="spinner"
        style={{
          width: 40,
          height: 40,
          borderColor: `#4f46e5 transparent transparent transparent`,
        }}
      ></div>
    </div>
  );
}
