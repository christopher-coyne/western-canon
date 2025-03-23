import { useInfiniteQuery } from "@tanstack/react-query";
import { FavoriteSnippetDto } from "@/types/api/Api";

import { api } from "@/lib/api-client";

type PaginatedResponse<T> = {
  items: T[];
  isSuccess: boolean;
  pagination: {
    total: number;
    page: number;
  };
};

export const getFavoriteSnippets = (
  page = 1,
  pageSize = 5
): Promise<PaginatedResponse<FavoriteSnippetDto>> => {
  return api
    .get("/favorites", {
      params: {
        page,
        pageSize,
      },
    })
    .then((response) => ({
      items: response.data.data,
      isSuccess: response.data.isSuccess,
      pagination: response.data.pagination,
    }));
};

export const getFavoriteSnippetsQueryOptions = () => {
  return {
    queryKey: ["favoriteSnippets"] as const,
    queryFn: ({ pageParam = 1 }) => getFavoriteSnippets(pageParam, 5),
    getNextPageParam: (lastPage: PaginatedResponse<FavoriteSnippetDto>) => {
      const hasNextPage =
        lastPage.pagination.page < Math.ceil(lastPage.pagination.total / 5);
      return hasNextPage ? lastPage.pagination.page + 1 : undefined;
    },
  };
};

type UseFavoriteSnippetsOptions = {
  queryConfig?: Partial<ReturnType<typeof getFavoriteSnippetsQueryOptions>>;
};

export const useGetFavoriteSnippets = ({
  queryConfig,
}: UseFavoriteSnippetsOptions) => {
  return useInfiniteQuery({
    ...getFavoriteSnippetsQueryOptions(),
    ...queryConfig,
    initialPageParam: 1,
  });
};
