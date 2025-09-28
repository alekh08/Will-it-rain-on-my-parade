from fastapi import APIRouter, Query
from services.nasa_api import get_weather_probability

router = APIRouter()

@router.get("/probability")
def weather_probability(
    lat: float = Query(..., description="Latitude of location"),
    lon: float = Query(..., description="Longitude of location"),
    date: str = Query(..., description="Date in YYYY-MM-DD")
):
    """
    Get probabilities of different weather conditions for a given location and date.
    """
    result = get_weather_probability(lat, lon, date)
    return result
