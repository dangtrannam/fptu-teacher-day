import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import { Layout } from "./Layout.jsx";
import IntroductionPage from "./pages/user/introduction.page.jsx";
import AvatarFrame from "./pages/user/avatarCreator.pages.jsx";
import LoginPage from "./pages/admin/login.page.jsx";
import TrackingPage from "./pages/admin/tracking.page.jsx";
import { useEffect } from "react";
import WishPage from "./pages/admin/wish.page.jsx";
import { ADMIN_TRACKINGS_PATH, ADMIN_WISHES_PATH } from "./constants/routerPaths";

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
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/introduction",
        element: <IntroductionPage />,
      },
      {
        path: "/avatar-creator",
        element: <AvatarFrame />,
      },

    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: ADMIN_TRACKINGS_PATH,
    element: <ProtectedRoute element={<TrackingPage />} />,
  },
  {
    path: "/admin/*",
    element: <ProtectedRoute element={<WishPage />} />,
  },
  {
    path: ADMIN_WISHES_PATH,
    element: <ProtectedRoute element={<WishPage />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);