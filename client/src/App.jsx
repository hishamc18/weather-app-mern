import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather, fetchHourlyForecast } from "./redux/slices/weatherSlice";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import Description from "./components/WeatherDescription";
import { FaHistory } from "react-icons/fa";
import WeatherHistory from "./components/WeatherHistory";
import "./App.css";

const cities = ["Moscow", "Delhi", "Paris", "New York", "Sydney", "Riyadh"];
function App() {
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState("Paris");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
      dispatch(fetchWeather(selectedCity));
      dispatch(fetchHourlyForecast(selectedCity));
  }, [dispatch, selectedCity]);

  const handleCityChange = (e) => {
      setSelectedCity(e.target.value);
  };

  return (
      <div
          className="min-h-screen bg-center flex md:justify-center md:items-center"
          style={{
              backgroundImage:
                  window.innerWidth < 768
                      ? `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(bgWeatherMobile.png)`
                      : `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(bgWeatherDesktop.png)`,
              backgroundSize: "cover",
          }}
      >
          <div className="w-full max-w-md md:max-w-7xl bg-transparent rounded-[2rem] py-10">
              {/* Top bar */}
              <div className="flex justify-between items-center px-6 mb-4">
                  <select
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="p-2 rounded-lg font-semibold shadow-lg"
                  >
                      {cities.map((city) => (
                          <option key={city} value={city}>
                              {city}
                          </option>
                      ))}
                  </select>
                  <button
                      onClick={() => setShowHistory((prev) => !prev)}
                      className="text-white p-2 rounded-full"
                  >
                      <FaHistory size={20} />
                  </button>
              </div>

              {/* Weather content */}
              {!showHistory ? (
                  <div className="flex md:flex-row flex-col gap-8 p-6 rounded-3xl">
                      <div className="md:w-1/3">
                          <WeatherCard />
                      </div>
                      <div className="flex flex-col gap-7 md:w-2/3 justify-between">
                          <HourlyForecast />
                          <Description />
                      </div>
                  </div>
              ) : (
                  <div className="h-[calc(100vh-25vh)] px-4 overflow-auto">
                      <WeatherHistory />
                  </div>
              )}
          </div>
      </div>
  );
}


export default App;
