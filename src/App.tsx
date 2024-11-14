import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { getWeather } from './services/weatherApi';
import { WeatherData, TemperatureUnit } from './types/weather';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError('');
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      {/* Glass morphism header */}
      <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Weather Forecast
          </h1>
          <p className="text-center text-gray-400 mt-4 text-lg">
            Real-time weather updates for any city worldwide
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
          
          {loading && (
            <div className="flex justify-center items-center mt-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
            </div>
          )}
          
          {error && (
            <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-red-400">{error}</p>
              </div>
            </div>
          )}
          
          {weather && <WeatherCard data={weather} unit={unit} onUnitChange={setUnit} />}
        </div>
      </div>
    </div>
  );
}

export default App;