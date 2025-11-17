import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ViewProject from '../pages/ViewProject';
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
        path: '/projects/:projectId',
        element: <ViewProject/>
      },
      {
        path: '/submit',
        element: <SubmitionPage/>
      }
      // Add more routes here as needed
    ],
  },
]);
