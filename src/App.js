import React, { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    const url = `https://script.google.com/macros/s/AKfycbxmvQwR4sTL6w7xxOIuG--ipEPvIzRho0T0_9uBETlI3fwmt-pg5Kk7dk-u25_15H6eig/exec?query=${encodeURIComponent(query)}&password=${encodeURIComponent(password)}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Error connecting to server" });
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h2>Military Base Access Checker</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter ID or Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? "Checking..." : "Check Access"}
      </button>

      {result && (
  <div
    className={`result ${
      result.access === "granted"
        ? "success"
        : result.access === "denied" || result.access === "not found"
        ? "failure"
        : ""
    }`}
  >
    {result.error && <p>{result.error}</p>}
    {result.access === "granted" && (
      <>
        <p>✅ Access GRANTED</p>
        <p>{result.name} ({result.id})</p>
        <p>Valid from {result.start} to {result.end}</p>
      </>
    )}
    {result.access === "denied" && (
      <>
        <p>❌ Access DENIED</p>
        <p>{result.name} ({result.id})</p>
        <p>Valid from {result.start} to {result.end}</p>
      </>
    )}
    {result.access === "not found" && <p>❌ No matching record found.</p>}
  </div>
)}
    </div>
  );
}

export default App;
