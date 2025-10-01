import { useState, useEffect } from "react";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchCity, setSearchCity] = useState("London");
  const [city, setCity] = useState("London");

  useEffect(() => {
    async function fetchWeather() {
      setIsLoading(true);
      setError("");
      setWeather(null);

      try {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}`
        );
        if (!geoResponse.ok) throw Error("Geo response failed");

        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
          throw Error("City not found");
        }

        const { latitude, longitude, name } = geoData.results[0];

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        if (!weatherResponse.ok) throw Error("Weather response failed");

        const weatherData = await weatherResponse.json();

        setWeather({ ...weatherData.current_weather, city: name });
      } catch (error) {
        setError("Something went wrong");
        if (searchCity !== "London") {
          setSearchCity("London");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, [searchCity]);

  function handleSearch() {
    if (!city.trim()) {
      return;
    }
    setSearchCity(city);
  }

  return (
    <>
      <input
        type="text"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <button onClick={handleSearch}>Search</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <>
          <h3>Country : {weather.country} km/h</h3>
          <h3>Temperature : {weather.temperature}°C</h3>
          <h3>Wind Speed : {weather.windspeed} km/h</h3>
        </>
      )}
    </>
  );
}
