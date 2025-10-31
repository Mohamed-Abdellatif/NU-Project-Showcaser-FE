import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ViewProject from '../pages/ViewProject';



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
        path: '/projects/:projectId',
        element: <ViewProject/>
      }
      // Add more routes here as needed
    ],
  },
]);
