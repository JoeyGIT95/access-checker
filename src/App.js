import React, { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const PASSWORD = "escort9191"; // Required password
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby9zp5du0JBY-zOUo6GtCdTzIJNktPs-jr0ufYIRgULke3Dypq1oQITO4E1mf2g7xGciA/exec"; // Google Apps Script URL

  const handleLogin = () => {
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("❌ Incorrect password");
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleCheck = async () => {
    if (!query.trim()) return;

    try {
      const url = `${SCRIPT_URL}?query=${encodeURIComponent(query.trim())}&password=${PASSWORD}`;
      const response = await fetch(url);
      const data = await response.json();

      // If the personnel is cleared (status "allowed")
      if (data.status === "allowed") {
        // Check if start_date or end_date is missing
        if (!data.start_date || !data.end_date) {
          data.message = "Clearance pending"; // Update message if no dates are available
          data.start_date = "N/A"; // Optionally show N/A for missing dates
          data.end_date = "N/A"; // Optionally show N/A for missing dates
        }
      }

      setResult(data); // Update the result state
    } catch (err) {
      console.error("Fetch error:", err);
      setResult({ status: "error", message: "Error checking clearance ❌" });
    }
  };

  return (
    <div className="App">
      <div className="content">
        <img src="new-logo.png" alt="Logo" className="logo" />
        <h1>Changi Naval Base Access Checker</h1>

        {!isAuthenticated ? (
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputField"
            />
            <button onClick={handleLogin} className="checkButton">
              Enter
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter ID or Name"
              className="inputField"
            />
            <button onClick={handleCheck} className="checkButton">
              Check Access
            </button>

            {result && (
              <div className="result">
                <p>{result.message}</p>
                {result.status === "allowed" && result.start_date && result.end_date && (
                  <p>
                    Clearance Period: {formatDate(result.start_date)} - {formatDate(result.end_date)}
                  </p>
                )}
                {result.status === "allowed" && (!result.start_date || !result.end_date) && (
                  <p>Clearance pending</p> // Show this if either date is missing
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
