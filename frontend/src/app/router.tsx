import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AllProjects } from "./routes/projects/all-projects";
import { Project } from "./routes/projects/project";
import { Feed } from "./routes/feed/feed";
import { Explore } from "./routes/explore/explore";
import { FavoriteSnippets } from "./routes/favorites/favorite-snippets";

export const router = createBrowserRouter([
  {
    path: "/", // Dynamic route with ID parameter
    element: <Feed />,
  },
  {
    path: "/test",
    element: <div>test here...</div>,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/projects",
    element: <AllProjects />,
  },
  {
    path: "/favorites",
    element: <FavoriteSnippets />,
  },
  {
    path: "/projects/:id", // Dynamic route with ID parameter
    element: <Project />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
