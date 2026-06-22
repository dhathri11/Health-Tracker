import { useState } from 'react';
import Health from './Frontend/Health'

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="App">
      {!started ? (
        <div className="home">
          <h1>🏥 Welcome to Health Tracker</h1>
          <p>Track your daily calories, sleep hours, and workout time — all in one place.<br />Stay healthy, stay strong!</p>
          <button onClick={() => setStarted(true)}>
            Get Started
          </button>
        </div>
      ) : (
        <Health />
      )}
    </div>
  );
}

export default App;
