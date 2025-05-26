import { fetchAndStoreWeather, getWeatherHistory as getHistory, fetchHourlyForecast } from '../services/weatherService.js';

export const getWeather = async (req, res, next) => {
  try {
    const city = req.params.city;
    const weather = await fetchAndStoreWeather(city);
    res.status(200).json(weather);
  } catch (error) {
    next(error);
  }
};

export const getWeatherHistory = async (req, res, next) => {
  try {
    const { city, from, to } = req.query;
    const data = await getHistory(city, from, to);
    console.log(data);
    
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};


export const getHourlyForecast = async (req, res, next) => {
    try {
      const data = await fetchHourlyForecast(req.params.city);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
  