import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import { Layout } from "./Layout.jsx";
import IntroductionPage from "./pages/user/introduction.page.jsx";
import AvatarFrame from "./pages/user/avatarCreator.pages.jsx";
import LoginPage from "./pages/admin/login.page.jsx";
import TrackingPage from "./pages/admin/tracking.page.jsx";
import { useEffect } from "react";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("fptuTeacherDayToken"); // Assuming token is stored in localStorage

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? element : null;
};

const router = createBrowserRouter([
  {
    path: "/fptu-teacher-day/",
    element: <Layout />,
    children: [
      {
        path: "/fptu-teacher-day/",
        element: <App />,
      },
      {
        path: "/fptu-teacher-day/introduction",
        element: <IntroductionPage />,
      },
      {
        path: "/fptu-teacher-day/avatar-creator",
        element: <AvatarFrame />,
      },

    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin/tracking-user",
    element: <ProtectedRoute element={<TrackingPage />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);