import { useState, useMemo } from "react";
import BonusDisplay from "./BonusDisplay";
export default function Scoreboard() {
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState(0);

  const total = useMemo(() => {
    console.log("Expensive calculation running...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += score * i;
    }
    return result;
  }, [score]);

  return (
    <>
      <h3>The score is : {score}</h3>
      <h3>The bonus is : {bonus}</h3>
      <h3>The total is : {total}</h3>
      <button onClick={() => setScore((prev) => prev + 1)}>
        Increment Score
      </button>
      <button onClick={() => setBonus((prev) => prev + 1)}>
        Increment Bonus
      </button>
      <BonusDisplay bonus={bonus} />
    </>
  );
}
