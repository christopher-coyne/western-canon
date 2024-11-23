import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./routes/homepage";
import { Generate } from "./routes/generate/generate";

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
        path: "/generate",
        element: <Generate />,
      },
]);

export const AppRouter = () => {
  
    return <RouterProvider router={router} />;
  };