import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto p-4 min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold md:text-5xl">404 ERROR.</h1>
        <p className="text-gray-400 font-semibold text-xl md:text-2xl">
          Page not found
        </p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-20 flex justify-self-center px-4 py-2 bg-gray-300 text-black rounded-lg hover:scale-95 hover:bg-gray-700 hover:text-white transition-all duration-300">
        Go Back
      </button>
    </section>
  );
};

export default NotFound;
