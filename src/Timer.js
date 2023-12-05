// Timer.js
import React, { useState, useEffect } from 'react';

function Timer({ initialTime, onTimeUp, isPaused }) {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    let interval;

    if (timer > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      // Invoke the callback when the timer reaches 0
      onTimeUp();
    }

    return () => clearInterval(interval);
  }, [timer, isPaused, onTimeUp]);

  return (
    <div className='timer'>
      {timer > 0 ? (
        <p>Time remaining: {timer} seconds</p>
      ) : (
        <p>Time's up!</p>
      )}
    </div>
  );
}

export default Timer;
