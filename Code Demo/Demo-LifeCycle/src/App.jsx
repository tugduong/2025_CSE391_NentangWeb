import React, { useState } from 'react';
import ClassTimer from './components/ClassTimer.jsx';
import FunctionTimer from './components/FunctionTimer.jsx';

function App() {
  // state để toggle giữa ClassTimer và FunctionTimer
  const [showClass, setShowClass] = useState(true);

  // Hàm chuyển đổi component
  const toggleTimer = () => {
    setShowClass(prev => !prev);
  };

  return (
    <div>
      <button onClick={toggleTimer}>
        {showClass ? 'Chuyển sang FunctionTimer' : 'Chuyển sang ClassTimer'}
      </button>
      <hr />
      {/* Render component tương ứng */}
      {showClass ? <ClassTimer /> : <FunctionTimer />}
    </div>
  );
}

export default App;
