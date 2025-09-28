import requests

def get_weather_probability(lat: float, lon: float, date: str):
    # 🚧 Placeholder logic until we wire real NASA APIs
    # Later: query Giovanni/OPeNDAP/Earthdata
    return {
        "location": {"lat": lat, "lon": lon},
        "date": date,
        "probabilities": {
            "very_hot": "10%",
            "very_cold": "5%",
            "very_windy": "20%",
            "very_wet": "40%",
            "very_uncomfortable": "15%"
        }
    }
