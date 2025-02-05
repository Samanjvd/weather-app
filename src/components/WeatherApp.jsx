import React, { useState } from "react";
import { City_Coordinates_JSON } from "./../City-Coordinates";

const WeatherApp = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    const location = City_Coordinates_JSON.find(
      (place) =>
        place.city.toLowerCase() === query.toLowerCase() ||
        place.country.toLowerCase() === query.toLowerCase()
    );

    if (!location) {
      alert("City or country not found!");
      return;
    }

    const url = `https://www.7timer.info/bin/api.pl?lat=${location.latitude}&lon=${location.longitude}&product=civillight&output=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Enter city or country"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
        onClick={handleSearch}
      >
        Search
      </button>

      {weatherData && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold">Weather Forecast</h2>
          {weatherData.dataseries.map((day, index) => (
            <div key={index} className="mt-2">
              <p>{`Date: ${day.date}`}</p>
              <p>{`Temperature: ${day.temp2m.min}°C - ${day.temp2m.max}°C`}</p>
              <p>{`Weather: ${day.weather}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
