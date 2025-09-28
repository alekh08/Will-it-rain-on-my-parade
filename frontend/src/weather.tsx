import { useState } from "react";

function Weather() {
  const [month, setMonth] = useState("");
  const [result, setResult] = useState<any>(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/weather?month=${month}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>NASA Climate Weather Dashboard</h2>
      <input
        type="text"
        placeholder="Enter Month (e.g., January)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Weather for {result.month}</h3>
          <p>Temperature: {result.data?.temp || "N/A"}</p>
          <p>Rainfall: {result.data?.rainfall || "N/A"}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
