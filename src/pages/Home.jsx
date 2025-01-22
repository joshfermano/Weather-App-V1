import React from 'react';
import Weather from '../components/Weather';

const Home = () => {
  return (
    <section className="max-w-7xl mx-auto p-4 min-h-screen">
      <div className="flex flex-col justify-center space-y-2 mb-10">
        <h1 className="text-xl md:text-2xl font-bold">Welcome!</h1>
        <p className="text-md md:text-lg text-gray-400">
          Weather Update Companion
        </p>
      </div>

      <Weather />
    </section>
  );
};

export default Home;
