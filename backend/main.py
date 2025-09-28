# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup so React (frontend) can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/weather")
def get_weather(month: str):
    # Example data
    weather_data = {
        "January": {"temp": "10°C", "rainfall": "20mm"},
        "September": {"temp": "25°C", "rainfall": "50mm"},
    }
    return {"month": month, "data": weather_data.get(month, "No data available")}
