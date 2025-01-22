import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { FaLocationDot, FaW } from 'react-icons/fa6';
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

const WeatherForecast = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [city, setCity] = useState('Manila');

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!res.ok) {
          setNotFound(true);
          throw new Error('City not found');
        }
        const data = await res.json();
        setForecast(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
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

  const formatDate = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleString('en-PH', {
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

  if (loading) return <div className="text-center">Loading...</div>;
  if (!forecast && !notFound) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="bg-gray-300 dark:bg-gray-200 dark:text-white p-4 rounded-xl md:w-[600px]">
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
      </div>

      {notFound ? (
        <div className="bg-gray-300 dark:bg-gray-200 p-8 rounded-xl w-full max-w-2xl">
          <div className="flex flex-col items-center justify-center w-full py-20">
            <img
              src={WeatherImg}
              alt="404 Not Found"
              className="w-52 h-52 md:w-[200px] md:h-[200px] opacity-50 mb-6 hover:scale-105 tranision duration-500"
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
        </div>
      ) : (
        <>
          {/* Location */}
          <div className="mt-10">
            <h1 className="flex items-center  md:text-3xl font-bold">
              <FaLocationDot className="mr-2" />
              {forecast.city.name}
            </h1>
          </div>

          {/* Forecast Grid */}
          <div className="flex flex-col items-center justify-center md:grid md:grid-cols-3 gap-4">
            {forecast.list
              .filter((item, index) => index % 8 === 0)
              .map((item, index) => (
                <div
                  key={item.dt}
                  className="bg-gray-300 dark:bg-gray-200 text-black p-4 rounded-xl shadow-lg hover:dark:shadow-gray-300 hover:shadow-gray-400 transition duration-500">
                  <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-base">{formatDate(item.dt)}</h1>
                    <img
                      src={weatherImage(item.weather[0].id)}
                      className="w-20 h-20 hover:scale-105 tranision duration-500"
                      alt={item.weather[0].description}
                    />
                    <h1 className="text-xl font-bold">
                      {Math.round(item.main.temp)}°C
                    </h1>
                    <p className="text-base capitalize">
                      {item.weather[0].description}
                    </p>

                    <div className="flex flex-row justify-between gap-10 items-center">
                      <div className="flex items-center gap-2">
                        <WiHumidity className="inline-block text-3xl" />
                        <div className="flex flex-col justify-center">
                          <h1 className="text-base font-semibold">Humidity</h1>
                          <span className="text-sm font-bold">
                            {item.main.humidity}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaWind className="inline-block text-2xl" />
                        <div className="flex flex-col justify-center">
                          <h1 className="text-base font-semibold">
                            Wind Speed
                          </h1>
                          <span className="text-sm font-bold">
                            {item.wind.speed} M/s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherForecast;
