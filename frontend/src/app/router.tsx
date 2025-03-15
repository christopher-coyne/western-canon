import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./routes/homepage";
import { AllProjects } from "./routes/projects/all-projects";
import { Project } from "./routes/projects/project";
import { Feed } from "./routes/feed/feed";
import { Explore } from "./routes/explore/explore";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
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
    path: "/projects/:id", // Dynamic route with ID parameter
    element: <Project />,
  },
  {
    path: "/feed", // Dynamic route with ID parameter
    element: <Feed />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
