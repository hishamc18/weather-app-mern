import express from 'express';
import { getWeather, getWeatherHistory, getHourlyForecast } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/:city', getWeather);
router.get('/history/search', getWeatherHistory);
router.get('/forecast/hourly/:city', getHourlyForecast);

export default router;