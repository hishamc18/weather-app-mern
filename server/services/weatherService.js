import Weather from '../models/weatherModel.js';
import fetchWeatherData from '../utils/fetchWeatherData.js';
import axios from 'axios';


const API_KEY = "2a20b19bacfd00d1f71c783e1c64f526";

export const fetchAndStoreWeather = async (city) => {
  const data = await fetchWeatherData(city);

  const weather = new Weather({
    city,
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    date: new Date(),
  });

  await weather.save();
  return weather;
};

export const getWeatherHistory = async (city, from, to) => {
  if (!city || !from || !to) throw new Error('City, from, and to are required');

  const fromDate = new Date(from);
  const toDate = new Date(to);
  toDate.setHours(23, 59, 59, 999);

  const diff = (toDate - fromDate) / (1000 * 60 * 60 * 24);

  console.log(city, fromDate, toDate);

  if (diff > 30) throw new Error('Date range cannot exceed 30 days');

  return await Weather.find({
    city: { $regex: new RegExp(`^${city}$`, 'i') },
    date: { $gte: fromDate, $lte: toDate },
  }).sort({ date: -1 });
};



export const fetchHourlyForecast = async (city) => {
  if (!city) throw new Error('City is required');
  try {
    const current = await fetchWeatherData(city);
    const { lat, lon } = current.coord;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    return {
      city: current.name,
      country: current.sys.country,
      hourly: response.data.list.slice(0, 10),
    };
  } catch (error) {
    console.error('Error fetching hourly forecast:', error.response?.data || error.message);
    throw error;
  }
};

