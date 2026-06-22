import React, { useState, useEffect } from 'react';
import './Health.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

function Health() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('healthData');
    return stored ? JSON.parse(stored) : [];
  });

  const [input, setInput] = useState({
    date: '',
    calories: '',
    sleep: '',
    workout: '',
  });

  useEffect(() => {
    localStorage.setItem('healthData', JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    const { date, calories, sleep, workout } = input;
    if (!date || !calories || !sleep || !workout) return alert('Please fill all fields');

    setData([...data, { ...input }]);
    setInput({ date: '', calories: '', sleep: '', workout: '' });
  };

  const deleteEntry = (index) => {
    if (window.confirm('Delete this entry?')) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  const totalCalories = data.reduce((sum, e) => sum + Number(e.calories), 0);
  const totalSleep = data.reduce((sum, e) => sum + Number(e.sleep), 0);
  const totalWorkout = data.reduce((sum, e) => sum + Number(e.workout), 0);

  const chartData = data.map((entry) => ({
    ...entry,
    calories: Number(entry.calories),
    sleep: Number(entry.sleep),
    workout: Number(entry.workout),
  }));

  return (
    <div className="App">
      <h2>🏃 Health Tracker</h2>

      <div className="form">
        <input type="date" name="date" value={input.date} onChange={handleChange} />
        <input type="number" name="calories" placeholder="Calories" value={input.calories} onChange={handleChange} />
        <input type="number" name="sleep" placeholder="Sleep (hrs)" value={input.sleep} onChange={handleChange} />
        <input type="number" name="workout" placeholder="Workout (mins)" value={input.workout} onChange={handleChange} />
        <button onClick={addEntry}>➕ Add Entry</button>
      </div>

      <h3>📋 Your Entries</h3>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>
            <strong>{entry.date}</strong><br />
            Calories: {entry.calories} kcal | Sleep: {entry.sleep} hrs | Workout: {entry.workout} mins
            <button className="delete-btn" onClick={() => deleteEntry(index)}>🗑️</button>
          </li>
        ))}
      </ul>

      {data.length > 0 && (
        <>
          <div className="totals">
            <h3>📊 Totals</h3>
            <p><strong>Total Calories:</strong> {totalCalories} kcal</p>
            <p><strong>Total Sleep:</strong> {totalSleep} hrs</p>
            <p><strong>Total Workout:</strong> {totalWorkout} mins</p>
          </div>

          <h3>📈 Health Overview</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calories" stroke="#ff6f00" name="Calories" />
                <Line type="monotone" dataKey="sleep" stroke="#0288d1" name="Sleep (hrs)" />
                <Line type="monotone" dataKey="workout" stroke="#2e7d32" name="Workout (mins)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Health;
