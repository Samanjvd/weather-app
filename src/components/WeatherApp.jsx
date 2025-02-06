import { useState } from "react";
import { City_Coordinates_JSON } from "./../City-Coordinates";

const WeatherApp = () => {
  const [saerchValue, setsaerchValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  console.log(weatherData);

  const handleSearch = async () => {
    const location = City_Coordinates_JSON.find(
      (place) =>
        place.city.toLowerCase() === saerchValue.toLowerCase() ||
        place.country.toLowerCase() === saerchValue.toLowerCase()
    );

    if (!location) {
      alert("City or country not found!");
      return;
    }

    const url = `https://www.7timer.info/bin/api.pl?lat=${location.latitude}&lon=${location.longitude}&product=civillight&output=json`;
    try {
      //   setWeatherData(
      //     fetch(url).then((res) => res.json())
      //     // .then((result) => result)
      //   );
      // } catch (error) {
      //   console.error("Error fetching weather data:", error);
      // }
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container px-[2rem] max-w-[1080px] min-h-screen flex flex-col mx-auto">
      <div className="flex justify-between mt-[2rem] ">
        <h1 className="">Weather App</h1>
        <div className="flex">
          <input
            type="search"
            className="p-[0.8rem]"
            placeholder="Enter city or country"
            value={saerchValue}
            onChange={(e) => setsaerchValue(e.target.value)}
          />
          <button className="" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {weatherData && (
        <div className="mt-[4rem] ">
          <h2 className="text-center">Weather Forecast</h2>
          <div className="mt-[2rem] flex justify-between">
            {weatherData.dataseries.map((day, index) => (
              <div key={index} className="">
                <p>{`Date: ${day.date}`}</p>
                <p>{`Temperature: ${day.temp2m.min}°C - ${day.temp2m.max}°C`}</p>
                <p>{`Weather: ${day.weather}`}</p>
                <p>{`wind-speed: ${day.wind10m_max}`}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
