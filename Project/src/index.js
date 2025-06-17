import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DataPage from './pages/DataPage';
import InfoPage from './pages/InfoPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DataPage />,
  },
  {
    path: '/info',
    element: <InfoPage />,
  }
  // {
  //   path: '*',
  //   element: <ErrorPage />,
  // },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);