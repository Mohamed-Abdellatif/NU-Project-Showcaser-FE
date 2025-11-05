import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import SubmitionPage from '../pages/SubmitionPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/submit',
        element: <SubmitionPage />,
      }
      // Add more routes here as needed
    ],
  },
]);
