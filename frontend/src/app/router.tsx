import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./routes/homepage";
import { Generate } from "./routes/generate/generate";
import { MusicRoot, MusicRootErrorBoundary } from "./routes/music/root";
import { MusicGenerate } from "./routes/music/generate";
import { MusicLibrary } from "./routes/music/library";
import { MusicBrowse } from "./routes/music/browse";

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
  {
    path: "/music",
    element: (
      <MusicRoot />
    ),
    ErrorBoundary: MusicRootErrorBoundary,
    children: [
      {
        path: "/music/generate",
        ErrorBoundary: MusicRootErrorBoundary,
        element: <MusicGenerate />,
      },
      {
        path: "/music/library",
        ErrorBoundary: MusicRootErrorBoundary,
        element: <MusicLibrary />
      },
      {
        path: "/music/browse",
        ErrorBoundary: MusicRootErrorBoundary,
        element: <MusicBrowse />
      },
    ]
  }
]);

export const AppRouter = () => {

  return <RouterProvider router={router} />;
};