import axios from 'axios';

const API_KEY = "2a20b19bacfd00d1f71c783e1c64f526";

const fetchWeatherData = async (city) => {
    const encodedCity = encodeURIComponent(city.trim());
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`;
    console.log("🔍 Fetching from:", url);
  
    const response = await axios.get(url);
    return response.data;
  };
  

export default fetchWeatherData;