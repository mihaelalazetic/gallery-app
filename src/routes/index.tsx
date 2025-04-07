import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Gallery from "../pages/Gallery";
import LoginPage from "../pages/Login";
import AuthLanding from "../pages/AuthLanding";

const router = createBrowserRouter([
  {
    path: "/login", // 👉 Standalone route
    element: <LoginPage />,
  },
  {
    path: "/auth", // 👉 Standalone route
    element: <AuthLanding />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "gallery", element: <Gallery /> },
    ],
  },
]);

export { router };
