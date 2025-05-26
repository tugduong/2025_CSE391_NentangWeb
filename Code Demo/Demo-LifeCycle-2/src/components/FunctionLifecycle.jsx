import React, { useState, useEffect, useRef } from 'react';
import '../App.css'; // CSS đồng hồ

// Functional Clock Component
function ClockFunction() {
  const [seconds, setSeconds] = useState(0);
  const [color, setColor] = useState('blue');
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // start timer helper
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds(prev => {
        const next = prev + 1;
        console.log(`tick → seconds: ${next}`);
        return next;
      });
    }, 1000);
  };

  // stop timer helper
  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  // Mount: just log
  useEffect(() => {
    console.log('useEffect (mount) → color = blue');
    return () => {
      console.log('useEffect cleanup (unmount) → color = red');
      stopTimer();
    };
  }, []);

  // Handle pause/resume and start on initial mount
  useEffect(() => {
    if (!paused) {
      console.log(`useEffect → resumed, color = ${color}`);
      startTimer();
    } else {
      console.log(`useEffect → paused, color = ${color}`);
      stopTimer();
    }
    return () => stopTimer();
  }, [paused]);

  // Toggle pause: change color on pause only
  const togglePause = () => {
    setPaused(prev => {
      const next = !prev;
      if (next) {
        setColor(prevColor => (prevColor === 'yellow' ? 'green' : 'yellow'));
      }
      return next;
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
      <div className="counter">Đã trôi: {seconds} giây</div>
      <button onClick={togglePause} className="pause-button">
        {paused ? 'Tiếp tục' : 'Tạm dừng'}
      </button>
    </div>
  );
}

// Functional parent managing show/hide
function FunctionLifecycle() {
  const [showClock, setShowClock] = useState(true);

  const toggleClock = () => setShowClock(prev => !prev);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button onClick={toggleClock} style={{ marginBottom: '1rem' }}>
        {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
      </button>
      {showClock && <ClockFunction />}
    </div>
  );
}

export default FunctionLifecycle;
