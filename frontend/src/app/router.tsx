import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./routes/homepage";
import { AllProjects } from "./routes/projects/all-projects";

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
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
