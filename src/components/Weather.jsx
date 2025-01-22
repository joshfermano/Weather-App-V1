import React from 'react';
import { useState, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';
import { FaWind } from 'react-icons/fa';
import WeatherImg from '../assets/images/weather.png';
import Clear from '../assets/images/clear-sky.png';
import Clouds from '../assets/images/clouds.png';
import Drizzle from '../assets/images/drizzle.png';
import Rain from '../assets/images/rain.png';
import Snow from '../assets/images/snow.png';
import Thunderstorm from '../assets/images/thunderstorm.png';
import Atmosphere from '../assets/images/atmosphere.png';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [city, setCity] = useState('Manila');

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!res.ok) {
          setNotFound(true);
          throw new Error('City not found');
        }
        const data = await res.json();
        setWeather(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city, API_KEY]);

  const weatherImage = (id) => {
    if (!id) return WeatherImg;
    if (id <= 232) return Thunderstorm;
    if (id <= 321) return Drizzle;
    if (id <= 531) return Rain;
    if (id <= 622) return Snow;
    if (id <= 781) return Atmosphere;
    if (id === 800) return Clear;
    if (id <= 804) return Clouds;
    return WeatherImg;
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-PH', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.city.value.trim();
    if (searchValue) {
      setCity(searchValue);
      e.target.city.value = '';
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!weather && !notFound) return null;

  return (
    <section className="max-w-7xl mx-auto p-4 min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-300 dark:bg-gray-200 dark:text-white p-4 rounded-xl w-[350px] md:w-[1000px] shadow-lg hover:dark:shadow-gray-300 hover:shadow-gray-400 transition duration-500">
          {/* Search area */}
          <form onSubmit={handleSearch} className="relative">
            <input
              name="city"
              type="text"
              className="w-full text-black bg-gray-50 rounded-lg p-2 outline-none pr-20 focus:outline-none placeholder:text-gray-500"
              placeholder="Enter City Name"
            />
            <button
              type="submit"
              className="absolute top-0 right-4 translate-y-2 hover:scale-95 transition-all duration-300">
              <IoSearchOutline className="text-2xl text-black" />
            </button>
          </form>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-10 text-black">
            {notFound ? (
              <div className="flex flex-col items-center justify-center w-full py-20">
                <img
                  src={WeatherImg}
                  alt="404 Not Found"
                  className="w-52 h-52 md:w-[200px] md:h-[200px] opacity-50 mb-6"
                />
                <h1 className="text-2xl md:text-4xl font-bold text-red-500 mb-4">
                  City Not Found
                </h1>
                <p className="text-base md:text-xl text-gray-600">
                  We couldn't find weather data for{' '}
                  <span className="font-bold">"{city}"</span>
                </p>
                <p className="text-sm md:text-lg text-gray-500 mt-2">
                  Please check the city name and try again
                </p>
              </div>
            ) : (
              <>
                {/* Image and Location */}
                <div className="flex flex-col items-center space-y-4 p-4">
                  <div className="flex justify-between items-center space-x-6 gap-20">
                    <h1 className="flex items-center space-x-6 text-xl md:text-2xl font-semibold">
                      <FaLocationDot /> {weather.name}
                    </h1>
                    <h1 className="text-sm md:text-xl">{getCurrentDate()}</h1>
                  </div>
                  <img
                    className="w-40 h-40 md:w-[300px] md:h-[300px] hover:scale-105 transition duration-500"
                    src={weatherImage(weather.weather[0].id)}
                    alt={weather.weather[0]?.description}
                  />
                </div>

                {/* Weather Info */}
                <div className="flex flex-1 flex-col justify-center items-center space-y-10 md:space-y-20 p-4">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold">
                      {Math.round(weather.main.temp)}°C
                    </h1>
                    <p className="text-base md:text-xl capitalize">
                      {weather.weather[0]?.description}
                    </p>
                  </div>

                  <div className="flex justify-between gap-10 mt-4">
                    <div className="flex items-center space-x-1">
                      <WiHumidity className="text-3xl md:text-5xl font-bold" />
                      <div className="flex flex-col">
                        <h1 className="text-base md:text-xl">Humidity</h1>
                        <p className="text-md font-bold">
                          {weather.main.humidity}%
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-1">
                        <FaWind className="text-3xl md:text-5xl font-bold" />
                        <div className="flex flex-col">
                          <h1 className="text-base md:text-xl">Wind Speed</h1>
                          <p className="text-md md:text-xl font-bold">
                            {weather.wind.speed} M/s
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weather;
