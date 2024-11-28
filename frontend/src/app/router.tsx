import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./routes/homepage";
import { Generate, GenerateRootErrorBoundary } from "./routes/generate/root";
import { MusicRoot, MusicRootErrorBoundary } from "./routes/music/root";
import { MusicGenerate } from "./routes/music/generate";
import { MusicLibrary } from "./routes/music/library";
import { MusicBrowse } from "./routes/music/browse";
import { MusicFavorites } from "./routes/music/favorites";
import { GenerateMusic } from "./routes/generate/music";
import { GenerateAll } from "./routes/generate/all";

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
    ErrorBoundary: GenerateRootErrorBoundary,
    children: [
      {
        path: "/generate/all",
        element: <GenerateAll />,
      },
      {
        path: "/generate/music",
        element: <GenerateMusic />,
      },
    ]
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
      {
        path: "/music/favorites",
        ErrorBoundary: MusicRootErrorBoundary,
        element: <MusicFavorites />
      },
    ]
  }
]);

export const AppRouter = () => {

  return <RouterProvider router={router} />;
};