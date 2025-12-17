import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ViewProject from "../pages/ViewProject";
import SubmissionPage from "../pages/SubmissionPage";
import Projects from "../pages/Projects";
import AcceptProject from "../pages/AcceptProject";
import RequireRole from "../hoc/RequireRole";
import StarredProjectsPage from "../pages/StarredProjectsPage";
import Profile from "../pages/UserProfile";
import CompleteProfile from "../pages/CompleteProfile";
import EditProfile from "../pages/editProfile";
import RequireCompleteProfile from "../hoc/RequireCompleteProfile";
import RequireProfileExists from "../hoc/RequireProfileExists";
import LearnMore from "../pages/LearnMore";
import AdminPanel from "../pages/AdminPanel";
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
          <RequireRole auth>
            <RequireCompleteProfile>
              <SubmissionPage />
            </RequireCompleteProfile>
          </RequireRole>
        ),
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/project-requests",
        element: (
          <RequireRole supervisor>
            <AcceptProject />
          </RequireRole>
        ),
      },
      {
        path: "/starred-projects",
        element: (
          <RequireRole auth>
            <StarredProjectsPage />
          </RequireRole>
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
            <RequireRole auth>
              <CompleteProfile />
            </RequireRole>
          </RequireCompleteProfile>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <RequireRole auth>
            <EditProfile />
          </RequireRole>
        ),
      },
      {
        path: "/admin-panel",
        element: (
          <RequireRole admin>
            <AdminPanel />
          </RequireRole>
        ),
      },
      {
        path: "/learn-more",
        element: <LearnMore />,

      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
      
      // Add more routes here as needed
    ],
  },
]);
