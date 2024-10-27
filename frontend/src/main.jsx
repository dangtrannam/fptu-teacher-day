import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout.jsx";
import IntroductionPage from "./pages/introduction.page.jsx";
import AvatarFrame from "./pages/avatarCreator.pages.jsx";


const router = createBrowserRouter([
  {
    path: "/fptu-teacher-day/",
    element: <Layout />,
    children: [
      {
        path: "/fptu-teacher-day/",
        element: <App />,
      },
      // {
      //   path: "/avatar-fptu18/avatar-creator",
      //   element: <AvatarFrame />,
      // },
      {
        path: "/fptu-teacher-day/introduction",
        element: <IntroductionPage />,
      },
      {
        path: "/fptu-teacher-day/avatar-creator",
        element: <AvatarFrame />,
      },
      // {
      //   path: "/fptu-teacher-day/counter-time",
      //   element: <CounterTime />,
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);