import React, { useState } from 'react';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handlePasswordSubmit = () => {
    if (passwordInput === 'escort9191') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleCheck = async () => {
  if (!query.trim()) return;

  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbxmvQwR4sTL6w7xxOIuG--ipEPvIzRho0T0_9uBETlI3fwmt-pg5Kk7dk-u25_15H6eig/exec?query=${encodeURIComponent(query.trim())}`);
    const data = await response.json();
    setResult(data);
  } catch (err) {
    setResult({ status: 'denied', message: 'Error checking clearance ❌' });
  }
};


  if (!authenticated) {
    return (
      <div className="container">
        <img src="/company-logo.png" alt="Company Logo" className="logo" />
        <h1 className="title">Access Checker</h1>
        <input
          type="password"
          placeholder="Enter Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button onClick={handlePasswordSubmit}>Enter</button>
      </div>
    );
  }

  return (
    <div className="container">
      <img src="/company-logo.png" alt="Company Logo" className="logo" />
      <h1 className="title">Base Access Checker</h1>
      <input
        type="text"
        placeholder="Enter Name or ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleCheck}>Check Access</button>
      {result && (
        <div className={`result ${result.status}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}

export default App;
