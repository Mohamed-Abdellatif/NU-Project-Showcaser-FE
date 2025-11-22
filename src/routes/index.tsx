import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ViewProject from '../pages/ViewProject';
import SubmitionPage from '../pages/SubmitionPage';
import Projects from '../pages/Projects';
import AcceptProject from '../pages/AcceptProject';



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
        element: <ViewProject />
      },
      {
        path: '/submit',
        element: <SubmitionPage />
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/project-requests',
        element: <AcceptProject />,

      }
      // Add more routes here as needed
    ],
  },
]);
