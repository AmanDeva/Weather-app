import React from 'react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { WiHumidity, WiStrongWind, WiThermometer, WiBarometer, WiSunrise, WiSunset } from 'react-icons/wi';
import { formatTemp, formatTime, getWindDirection } from '../utils/formatters';

interface WeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, unit, onUnitChange }) => {
  const { main, weather, wind, sys, name } = data;

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg">
      {/* Header Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold">{name}</h2>
              <span className="text-xl text-gray-400">{sys.country}</span>
            </div>
            <p className="text-gray-400 mt-1 capitalize">{weather[0].description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onUnitChange('celsius')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                unit === 'celsius' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => onUnitChange('fahrenheit')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                unit === 'fahrenheit' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {/* Temperature Section */}
      <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
              alt={weather[0].description}
              className="w-24 h-24"
            />
            <div>
              <div className="text-5xl font-bold">
                {formatTemp(main.temp, unit)}°
              </div>
              <p className="text-gray-400">
                Feels like {formatTemp(main.feels_like, unit)}°
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">High / Low</div>
            <p className="text-xl">
              {formatTemp(main.temp_max, unit)}° / {formatTemp(main.temp_min, unit)}°
            </p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        <WeatherDetail
          icon={<WiHumidity className="text-3xl text-blue-400" />}
          label="Humidity"
          value={`${main.humidity}%`}
        />
        <WeatherDetail
          icon={<WiStrongWind className="text-3xl text-blue-400" />}
          label="Wind"
          value={`${wind.speed} m/s ${getWindDirection(wind.deg)}`}
        />
        <WeatherDetail
          icon={<WiSunrise className="text-3xl text-blue-400" />}
          label="Sunrise"
          value={formatTime(sys.sunrise)}
        />
        <WeatherDetail
          icon={<WiSunset className="text-3xl text-blue-400" />}
          label="Sunset"
          value={formatTime(sys.sunset)}
        />
      </div>
    </div>
  );
};

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ icon, label, value }) => (
  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300">
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  </div>
);