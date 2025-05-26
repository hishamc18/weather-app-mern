import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import weatherService from '../../services/weatherServices';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  return await weatherService.getWeather(city);
});

export const fetchHourlyForecast = createAsyncThunk('weather/fetchHourlyForecast', async (city) => {
  return await weatherService.getHourlyForecast(city);
});

export const fetchWeatherHistory = createAsyncThunk(
  'weather/fetchWeatherHistory',
  async ({ city, from, to }) => {
    return await weatherService.getWeatherHistory(city, from, to);
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    current: null,
    hourly: [],
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.hourly = action.payload;
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(fetchWeatherHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchWeatherHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
