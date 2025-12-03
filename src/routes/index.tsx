import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ViewProject from "../pages/ViewProject";
import SubmissionPage from "../pages/SubmissionPage";
import Projects from "../pages/Projects";
import AcceptProject from "../pages/AcceptProject";
import RequireAuth from "../hoc/RequireAuth";
import StarredProjectsPage from "../pages/StarredProjectsPage";
import Profile from "../pages/UserProfile";
import CompleteProfile from "../pages/CompleteProfile";
import EditProfile from "../pages/editProfile";
import RequireCompleteProfile from "../hoc/RequireCompleteProfile";
import RequireProfileExists from "../hoc/RequireProfileExists";
import RequireSupervisor from "../hoc/RequireSupervisor";
import LearnMore from "../pages/LearnMore";
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
            <RequireCompleteProfile>
              <SubmissionPage />
            </RequireCompleteProfile>
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
            <RequireSupervisor>
              <AcceptProject />
            </RequireSupervisor>
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
      {
        path: "/profile/:userName",
        element: (
          <RequireProfileExists>
            <Profile />
          </RequireProfileExists>
        ),
      },
      {
        path: "/complete-profile",
        element: (
          <RequireCompleteProfile completedProfile={true}>
            <RequireAuth>
              <CompleteProfile />
            </RequireAuth>
          </RequireCompleteProfile>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/learn-more",
        element: <LearnMore />,

      }
      // Add more routes here as needed
    ],
  },
]);
