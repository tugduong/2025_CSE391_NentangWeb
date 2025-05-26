
import React, { useState, useEffect } from 'react';

function FunctionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Khi component mount, tạo interval
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup: trả về hàm clearInterval để chạy khi unmount
    return () => {
      clearInterval(interval);
    };
  }, []); // []: chỉ chạy hiệu ứng một lần khi mount

  return (
    <div>
      <h2>Function Timer</h2>
      <p>Giây đã trôi: {seconds}</p>
    </div>
  );
}

export default FunctionTimer;
