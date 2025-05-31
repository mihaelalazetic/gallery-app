import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import LoginPage from "../pages/Login";
import AuthLanding from "../pages/AuthLanding";
import ArtworkUploadForm from "../forms/ArtworkUploadForm";
import CategoryUploadForm from "../forms/CategoryUploadForm";
import UserProfile from "../pages/UserProfile";
import { AuthProvider } from "../context/AuthContext";
import CreateEventExhibitionForm from "../forms/CreateEventExhibitionForm";

const router = createBrowserRouter([
  {
    path: "/auth", // 👉 Standalone route
    element: (
      <AuthProvider>
        <AuthLanding />
      </AuthProvider>
    ),
  },

  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "explore", element: <Explore /> },
      {
        path: "upload-artwork",
        element: <ArtworkUploadForm />,
      },
      {
        path: "upload-category",
        element: <CategoryUploadForm />,
      },
      {
        path: "profile/:slug",
        element: <UserProfile />,
      },

    ],
  },
]);

export { router };
