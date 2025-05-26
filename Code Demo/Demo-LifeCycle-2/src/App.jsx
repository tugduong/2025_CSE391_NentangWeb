import React, { useState } from 'react';
import ClassLifecycle from './components/ClassLifecycle';
import FunctionLifecycle from './components/FunctionLifecycle';

function App() {
  const [useClass, setUseClass] = useState(true);

  const toggleDemo = () => {
    setUseClass(prev => !prev);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button onClick={toggleDemo} style={{ marginBottom: '1rem' }}>
        {useClass ? 'Chuyển sang Function Lifecycle' : 'Chuyển sang Class Lifecycle'}
      </button>
      <div>
        {useClass ? <ClassLifecycle /> : <FunctionLifecycle />}
      </div>
    </div>
  );
}

export default App;
