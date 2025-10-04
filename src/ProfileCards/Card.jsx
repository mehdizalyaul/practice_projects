import React from "react";

function CardComponent({ image, children, footer }) {
  const cardStyle = {
    border: "2px solid #333",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px 0",
    backgroundColor: "#f9f9f9",
    width: "250px",
  };

  const headerStyle = {
    marginBottom: "12px",
    textAlign: "center",
  };

  const bodyStyle = {
    marginBottom: "12px",
  };

  const footerStyle = {
    textAlign: "center",
  };

  return (
    <li style={cardStyle}>
      {image && <div style={headerStyle}>{image}</div>}
      <div style={bodyStyle}>{children}</div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </li>
  );
}

const Card = React.memo(CardComponent);

export default Card;
