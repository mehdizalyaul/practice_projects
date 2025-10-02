import { useState } from "react";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("London");
  const [results, setResults] = useState([]);

  async function handleSearch() {
    setIsLoading(true);
    setIsLoading(true);

    try {
      if (!city.trim) {
        return;
      }
      const geoCityResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      if (!geoCityResponse.ok) {
        throw Error("geoCityResponse Failed");
      }

      const geoCityData = await geoCityResponse.json();
      setResults(geoCityData.results);
      setIsLoading(false);
    } catch (error) {
      setError("Something went wrong");
    }
  }

  async function fetchWeather(lat, lon, name, country) {
    console.log(lat, lon);
    try {
      setResults([]);
      setIsLoading(true);
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      if (!weatherResponse.ok) {
        console.log("Hanas");

        throw Error("Weather response Failed");
      }
      const weatherData = await weatherResponse.json();

      setWeather({ ...weatherData.current_weather, name, country });
      setIsLoading(false);
    } catch (error) {
      setError("Something Went Wrong");
    }
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

      <ul>
        {results &&
          results.map((result) => {
            return (
              <li
                key={result.id}
                onClick={() =>
                  fetchWeather(
                    result.latitude,
                    result.longitude,
                    result.name,
                    result.country
                  )
                }
              >
                {result.name} {result.country}
              </li>
            );
          })}
      </ul>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <>
          <h3>Country : {weather.country} </h3>
          <h3>City : {weather.name} </h3>
          <h3>Temperature : {weather.temperature}°C</h3>
          <h3>Wind Speed : {weather.windspeed} km/h</h3>
        </>
      )}
    </>
  );
}
