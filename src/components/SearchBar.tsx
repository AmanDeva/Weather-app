import React, { useState, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  const clearInput = () => {
    setCity('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`relative transition-transform duration-300 ${
        isFocused ? 'scale-[1.02]' : ''
      }`}>
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a city..."
          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent placeholder-gray-400 text-white pr-24 transition-all duration-300"
          disabled={isLoading}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {city && (
            <button
              type="button"
              onClick={clearInput}
              className="p-2 hover:bg-white/5 rounded-full transition-colors duration-300"
            >
              <FiX size={20} className="text-gray-400" />
            </button>
          )}
          <button
            type="submit"
            disabled={!city.trim() || isLoading}
            className={`p-3 rounded-xl transition-all duration-300 ${
              city.trim() && !isLoading
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-white/5 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FiSearch size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};