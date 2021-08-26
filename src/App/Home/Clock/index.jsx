import React, { useState, useEffect } from "react";
import "./styles.sass";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  return <h2 className="clock">{date.toLocaleTimeString()}</h2>;
};

export default Clock;
