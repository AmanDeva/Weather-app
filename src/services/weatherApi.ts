import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured');
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
      }
      throw new Error(error.response?.data.message || 'Failed to fetch weather data');
    }
    throw error;
  }
};