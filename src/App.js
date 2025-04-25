import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    const approvedIDs = ['12345', '67890', 'A123'];
    if (approvedIDs.includes(query.trim())) {
      setResult({ status: 'allowed', message: 'Personnel is cleared for entry ✅' });
    } else {
      setResult({ status: 'denied', message: 'No clearance found ❌' });
    }
  };

  return (
    <div className="container">
      <img src="/company-logo.png" alt="Company Logo" className="logo" />
      <h1>Base Access Checker</h1>
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
