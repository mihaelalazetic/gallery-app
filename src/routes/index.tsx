import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EventDetail from "../components/event/EventDetail";
import EventsList from "../components/event/EventsList";
import { AuthProvider } from "../context/AuthContext";
import ArtworkUploadForm from "../forms/ArtworkUploadForm";
import CategoryUploadForm from "../forms/CategoryUploadForm";
import AuthLanding from "../pages/AuthLanding";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";

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
      { path: "events", element: <EventsList /> },
      { path: "events/:slug", element: <EventDetail /> },
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
