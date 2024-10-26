import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import AvatarCreator from "./pages/create-avatar.page.jsx";
import { Layout } from "./Layout.jsx";
// import IntroductionPage from "./pages/introduction.page.jsx";
// import AvatarFrame from "./pages/avatar-frame.page.jsx";
// import CounterTime from "./pages/couter-time.page.jsx";

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
      // {
      //   path: "/avatar-fptu18/introduction",
      //   element: <IntroductionPage />,
      // },
      // {
      //   path: "/avatar-fptu18/create-frame/:type",
      //   element: <AvatarCreator />,
      // },
      // {
      //   path: "/avatar-fptu18/counter-time",
      //   element: <CounterTime />,
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);