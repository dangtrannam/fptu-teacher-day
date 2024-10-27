import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import AvatarCreator from "./pages/create-avatar.page.jsx";
import { Layout } from "./Layout.jsx";
import IntroductionPage from "./pages/introduction.page.jsx";
import AvatarCreatorPage from "./pages/avatarCreator.pages.jsx";
// import CounterTime from "./pages/couter-time.page.jsx";
// import AvatarFrame from "./pages/avatar-frame.page.jsx";

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
        path: "/fptu-teacher-day/:type",
        element: <AvatarCreatorPage />,
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