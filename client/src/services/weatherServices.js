import axiosInstance from './api/axiosInstance';

const getWeather = async (city) => {
  const res = await axiosInstance.get(`/${city}`);
  return res.data;
};

const getHourlyForecast = async (city) => {
  const res = await axiosInstance.get(`/forecast/hourly/${city}`);
  return res.data;
};

const getWeatherHistory = async (city, from, to) => {
  // build query params string for GET
  const res = await axiosInstance.get('/history/search', {
    params: { city, from, to },
  });
  return res.data;
};

const weatherService = {
  getWeather,
  getHourlyForecast,
  getWeatherHistory,
};

export default weatherService;
