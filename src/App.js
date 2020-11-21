import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  const eventHandler = async () => {
    const events = new EventSource('/events');
    events.onmessage = async (event) => {
      const resp = await fetch('/api');
      const respJson = await resp.json();
      setTasks(respJson.tasks);
    };
  };

  useEffect(() => {
    eventHandler();
  }, []);

  return (
    <div className="App">
      <h1>HTTP SSE</h1>
      <ul>
        {tasks.map((task, idx) => (
          <li key={idx.toString()}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
