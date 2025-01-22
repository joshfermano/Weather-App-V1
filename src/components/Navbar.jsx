import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillLightbulbOffFill } from 'react-icons/bs';
import { BsFillLightbulbFill } from 'react-icons/bs';
import { IoMdMenu } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const systemDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setDarkMode(systemDark);
      document.documentElement.classList.toggle('dark', systemDark);
      localStorage.setItem('theme', systemDark ? 'dark' : 'light');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="max-w-7xl mx-auto p-4 font-poppins">
      <div className="relative flex justify-between items-center p-4 border-b border-b-slate-300">
        <NavLink>
          <div className="flex flex-col space-y-2 hover:scale-95 transition duration-300">
            <h1 className="text-xl md:text-3xl font-bold">BreezyWeather</h1>
            <p className="text-sm w-[200px] md:w-full text-gray-400">
              Navigate the Forecast, Feel the Breeze
            </p>
          </div>
        </NavLink>

        <div className="hidden md:flex items-center">
          <ul className="flex items-center space-x-8 mr-8">
            <NavLink to="/">
              <li className="hover:scale-95 transition duration-300">Home</li>
            </NavLink>

            <NavLink to="forecast">
              <li className="hover:scale-95 transition duration-300">
                Forecast
              </li>
            </NavLink>
          </ul>

          {darkMode ? (
            <BsFillLightbulbFill
              className="text-xl cursor-pointer text-yellow-300"
              onClick={toggleDarkMode}
            />
          ) : (
            <BsFillLightbulbOffFill
              className="text-xl cursor-pointer text-black"
              onClick={toggleDarkMode}
            />
          )}
        </div>

        <div className="md:hidden flex items-center space-x-4">
          {darkMode ? (
            <BsFillLightbulbFill
              className="text-xl cursor-pointer text-yellow-300"
              onClick={toggleDarkMode}
            />
          ) : (
            <BsFillLightbulbOffFill
              className="text-xl cursor-pointer text-black"
              onClick={toggleDarkMode}
            />
          )}

          <div onClick={toggleMobileMenu} className="text-xl">
            {isMobile ? <MdOutlineClose /> : <IoMdMenu />}
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="fixed z-20 left-1/2 top-30 w-11/12 max-w-md -translate-x-1/2 p-4 bg-gray-600 text-black dark:text-white dark:bg-black shadow-lg shadow-gray-400 rounded-lg">
          <ul className="flex flex-col items-center space-y-4">
            <NavLink to="/" onClick={() => setIsMobile(false)}>
              <li className="hover:scale-95 transition duration-300">Home</li>
            </NavLink>

            <NavLink to="forecast" onClick={() => setIsMobile(false)}>
              <li className="hover:scale-95 transition duration-300">
                Forecast
              </li>
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
