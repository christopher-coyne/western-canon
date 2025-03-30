import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

/*
export const createDiscussionInputSchema = z.object({
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
});

export type CreateDiscussionInput = z.infer<typeof createDiscussionInputSchema>;
*/

export const toggleFavorite = ({ id }: { id: string }): Promise<any> => {
  return api.put(`/favorites/snippets/${id}`);
};

type UseToggleFavoriteOptions = {
  mutationConfig?: MutationConfig<typeof toggleFavorite>;
};

export const useToggleFavorite = ({
  mutationConfig,
}: UseToggleFavoriteOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    mutationFn: toggleFavorite,
    ...restConfig,
  });
};
