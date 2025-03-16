import { MainLayout } from "@/components/layouts/main-layout";
import { FavoriteSnippetsView } from "@/features/favorites/favorite-snippets";

export const FavoriteSnippets = () => {
  return (
    <MainLayout>
      <FavoriteSnippetsView />
    </MainLayout>
  );
};
