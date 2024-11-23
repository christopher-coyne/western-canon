import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world! xyz</div>,
    },
    {
        path: "/test",
        element: <div>test here...</div>,
      },
]);

export const AppRouter = () => {
  
    return <RouterProvider router={router} />;
  };