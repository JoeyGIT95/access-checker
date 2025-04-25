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

  const handleCheck = () => {
    const approvedIDs = ['12345', '67890', 'A123'];
    if (approvedIDs.map(id => id.toLowerCase()).includes(query.trim().toLowerCase())) {
      setResult({ status: 'allowed', message: '✅ Personnel is cleared for entry' });
    } else {
      setResult({ status: 'denied', message: '❌ No clearance found' });
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
