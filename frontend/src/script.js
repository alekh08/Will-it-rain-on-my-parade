async function fetchWeather(month) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/weather?month=${month}`);
      const data = await response.json();
  
      // Display result in frontend
      document.getElementById("result").innerHTML = `
        <h3>Weather for ${data.month}</h3>
        <p>Temperature: ${data.data.temp || "N/A"}</p>
        <p>Rainfall: ${data.data.rainfall || "N/A"}</p>
      `;
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }
  
  // Example: Fetch January weather when button clicked
  document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const month = document.getElementById("monthInput").value;
    fetchWeather(month);
  });
  