import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./routes/homepage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
        path: "/test",
        element: <div>test here...</div>,
      },
]);

export const AppRouter = () => {
  
    return <RouterProvider router={router} />;
  };