import React, { useState, useEffect, useRef } from 'react';
import '../App.css'; // CSS đồng hồ

// Functional Clock Component
function ClockFunction() {
  const [seconds, setSeconds] = useState(0);
  const [color, setColor] = useState('blue');
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // Mount log and unmount cleanup
  useEffect(() => {
    console.log('useEffect (mount) → color = blue');
    return () => {
      console.log('useEffect cleanup (unmount) → color = red');
      clearInterval(timerRef.current);
    };
  }, []);

  // Handle timer based on paused state
  useEffect(() => {
    if (!paused) {
      console.log(`useEffect → resumed, color = ${color}`);
      timerRef.current = setInterval(() => {
        setSeconds(prev => {
          const next = prev + 1;
          console.log(`tick → seconds: ${next}`);
          return next;
        });
      }, 1000);
    } else {
      console.log(`useEffect → paused, color = ${color}`);
    }
    return () => clearInterval(timerRef.current);
  }, [paused]);

  // Toggle pause: on resume, alternate color; on pause, no color change
  const togglePause = () => {
    setPaused(prevPaused => {
      const nextPaused = !prevPaused;
      if (!nextPaused) {
        // Resuming: toggle hand color between green and yellow
        setColor(prevColor => (prevColor === 'yellow' ? 'green' : 'yellow'));
      }
      return nextPaused;
    });
  };

  const angle = seconds * 6;

  return (
    <div className="clock">
      <div
        className="hand"
        style={{
          transform: `rotate(${angle}deg)`,
          backgroundColor: color
        }}
      />
      <div className="counter">
        Đã trôi: {seconds} giây
      </div>
      <button onClick={togglePause} className="pause-button">
        {paused ? 'Tiếp tục' : 'Tạm dừng'}
      </button>
    </div>
  );
}

// Functional parent managing show/hide
function FunctionLifecycle() {
  const [showClock, setShowClock] = useState(true);

  const toggleClock = () => {
    setShowClock(prev => !prev);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button onClick={toggleClock} style={{ marginBottom: '1rem' }}>
        {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
      </button>
      <div>
        {showClock && <ClockFunction />}
      </div>
    </div>
  );
}

export default FunctionLifecycle;
