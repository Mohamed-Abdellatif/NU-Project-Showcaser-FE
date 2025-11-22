import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ViewProject from "../pages/ViewProject";
import SubmissionPage from "../pages/SubmissionPage";
import Projects from "../pages/Projects";
import AcceptProject from "../pages/AcceptProject";
import RequireAuth from "../hoc/RequireAuth";
import StarredProjectsPage from "../pages/StarredProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/projects/:projectId",
        element: <ViewProject />,
      },
      {
        path: "/submit",
        element: (
          <RequireAuth>
            <SubmissionPage />
          </RequireAuth>
        ),
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/project-requests",
        element: (
          <RequireAuth>
            <AcceptProject />
          </RequireAuth>
        ),
      },
      {
        path: "/starred-projects",
        element: (
          <RequireAuth>
            <StarredProjectsPage />
          </RequireAuth>
        ),
      },
      // Add more routes here as needed
    ],
  },
]);
