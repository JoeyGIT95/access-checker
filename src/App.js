<<<<<<< HEAD
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const PASSWORD = "escort9191"; // Required password
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby9zp5du0JBY-zOUo6GtCdTzIJNktPs-jr0ufYIRgULke3Dypq1oQITO4E1mf2g7xGciA/exec";

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

  const isExpired = (endDate) => {
    const currentDate = new Date();
    const end = new Date(endDate);
    return end < currentDate;
  };

  const handleCheck = async () => {
    if (!query.trim()) {
      alert("Please enter an ID first.");
      return;
    }

    setIsLoading(true);

    try {
      const url = `${SCRIPT_URL}?query=${encodeURIComponent(query.trim())}&password=${PASSWORD}`;
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(data);

      if (data.status === "allowed") {
        if (!data.start_date || !data.end_date) {
          data.message = "Clearance pending";
          data.start_date = "N/A";
          data.end_date = "N/A";
        }
      }

      let companies = [];
      if (data.company_1) companies.push(data.company_1);
      if (data.company_2) companies.push(data.company_2);
      if (data.company_3) companies.push(data.company_3);

      data.company_names = companies.join(" | ");

      setResult(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setResult({ status: "error", message: "Error checking clearance ❌" });
    }

    setIsLoading(false);
  };

  const formatClearancePeriod = (startDate, endDate) => {
    if (!startDate || !endDate) return null;

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    if (isExpired(endDate)) {
      return `${formattedStartDate} - ${formattedEndDate} | EXPIRED`;
    } else {
      return `${formattedStartDate} - ${formattedEndDate}`;
    }
  };

  return (
    <div className="App">
      <div className="content">
        <img src="/new-logo.png" alt="Logo" className="logo" />
        <h1>Changi Naval Base Access Checker</h1>

        {!isAuthenticated ? (
          <div>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputField"
              />
              <button
                type="button"
                className="revealButton"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
              placeholder="Enter FIN or NRIC"
              className="inputField"
            />
            <button onClick={handleCheck} className="checkButton">
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                "Check Access"
              )}
            </button>

            {result && (
              <div
                className={`result ${
                  result.status === "allowed" &&
                  !formatClearancePeriod(result.start_date, result.end_date)?.includes("EXPIRED")
                    ? "allowed"
                    : "denied"
                }`}
              >
                <p><strong>Name:</strong> {result.name || "Unknown"}</p>

                {result.company_names && (
                  <p><strong>Company:</strong> {result.company_names}</p>
                )}

                <p>
                  {formatClearancePeriod(result.start_date, result.end_date)?.includes("EXPIRED")
                    ? "Personnel is NOT cleared for entry"
                    : result.message}
                </p>

                {(result.status === "allowed" || result.status === "expired") && result.start_date && result.end_date ? (
                  <p>
                    Clearance Period: {formatClearancePeriod(result.start_date, result.end_date)}
                  </p>
                ) : (
                  result.status === "allowed" && <p>Clearance pending</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
=======
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
>>>>>>> 06fcbc597297ddbbd0fe984e032998d515f314f4
    </div>
  );
}

export default App;
