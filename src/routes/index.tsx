import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import LoginPage from "../pages/Login";
import AuthLanding from "../pages/AuthLanding";
import ArtworkUploadPage from "../forms/ArtworkUploadForm";
import CategoryUploadForm from "../forms/CategoryUploadForm";

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
      { path: "explore", element: <Explore /> },
      {
        path: "upload-artwork", // 👉 Standalone route
        element: <ArtworkUploadPage />,
      },
      {
        path: "upload-category", // 👉 Standalone route
        element: <CategoryUploadForm />,
      },
    ],
  },
]);

export { router };
