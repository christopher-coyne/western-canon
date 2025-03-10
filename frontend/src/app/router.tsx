import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./routes/homepage";
import { AllProjects } from "./routes/projects/all-projects";
import { Project } from "./routes/projects/project";

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
    path: "/projects",
    element: <AllProjects />,
  },
  {
    path: "/projects/:id", // Dynamic route with ID parameter
    element: <Project />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
