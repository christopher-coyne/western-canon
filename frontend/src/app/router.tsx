import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Feed } from "./routes/feed/feed";
import { Explore } from "./routes/explore/explore";
import { FavoriteSnippets } from "./routes/favorites/favorite-snippets";
import { ProfileRoute } from "./routes/profile/profile";

export const router = createBrowserRouter([
  {
    path: "/", // Dynamic route with ID parameter
    element: <Feed />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/favorites",
    element: <FavoriteSnippets />,
  },
  {
    path: "/profile",
    element: <ProfileRoute />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
