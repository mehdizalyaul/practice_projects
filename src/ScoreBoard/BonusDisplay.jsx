import React from "react";

const BonusDisplay = React.memo(function BonusDisplay({ bonus }) {
  return (
    <>
      <p>Bonus Display {bonus}</p>
    </>
  );
});

export default BonusDisplay;
