import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import NotFound from './pages/NotFound';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <AnimatePresence mode="wait">
              <Home />
            </AnimatePresence>
          }
        />
        <Route
          path="forecast"
          element={
            <AnimatePresence mode="wait">
              <Forecast />
            </AnimatePresence>
          }
        />
        <Route
          path="*"
          element={
            <AnimatePresence mode="wait">
              <NotFound />
            </AnimatePresence>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
