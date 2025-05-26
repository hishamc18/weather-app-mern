import React from 'react';
import { useSelector } from 'react-redux';

const HourlyForecast = () => {
  const { hourly } = useSelector((state) => state.weather);
  const forecastArray = hourly?.hourly?.slice(0, 10); 

  const formatHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  // Split into two rows of 5
  const firstRow = forecastArray?.slice(0, 5);
  const secondRow = forecastArray?.slice(5, 10);

  return (
    <div className="hourly-radial-bg p-4 rounded-2xl text-center font-semibold text-[15px] text-white">
      {/* First row */}
      <div className="grid grid-cols-5 gap-x-2 gap-y-4">
        {firstRow?.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div>{idx === 0 ? 'Now' : formatHour(item.dt)}</div>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="w-6 h-6"
            />
            <div>{Math.round(item.main.temp)}&nbsp;°</div>
          </div>
        ))}
      </div>

      {/* White line separator */}
      <div className="w-full border-t border-white my-4"></div>

      {/* Second row */}
      <div className="grid grid-cols-5 gap-x-2 gap-y-4">
        {secondRow?.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div>{formatHour(item.dt)}</div>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="w-6 h-6"
            />
            <div>{Math.round(item.main.temp)}&nbsp;°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
