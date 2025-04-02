import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { ToggleFavoriteSnippetResponseDto } from "@/types/api/Api";

/*
export const createDiscussionInputSchema = z.object({
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
});

export type CreateDiscussionInput = z.infer<typeof createDiscussionInputSchema>;
*/

export const toggleFavoriteFeed = ({
  id,
}: {
  id: string;
}): Promise<ToggleFavoriteSnippetResponseDto> => {
  return api.put(`/favorites/snippets/${id}`);
};

type UseToggleFavoriteFeedOptions = {
  mutationConfig?: MutationConfig<typeof toggleFavoriteFeed>;
};

export const useToggleFavoriteFeed = ({
  mutationConfig,
}: UseToggleFavoriteFeedOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    mutationFn: toggleFavoriteFeed,
    ...restConfig,
  });
};
