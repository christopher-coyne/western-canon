import { useInfiniteQuery } from "@tanstack/react-query";
import { SnippetDto } from "@/types/api/Api";

import { api } from "@/lib/api-client";

type PaginatedResponse<T> = {
  items: T[];
  isSuccess: boolean;
  pagination: {
    total: number;
    page: number;
    // ... other pagination fields
  };
};

export const getFeed = (
  page = 1,
  pageSize = 5
): Promise<PaginatedResponse<SnippetDto>> => {
  return api
    .get("/feed", {
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

export const getFeedQueryOptions = () => {
  return {
    queryKey: ["feed"] as const,
    queryFn: ({ pageParam = 1 }) => getFeed(pageParam, 5),
    getNextPageParam: (lastPage: PaginatedResponse<SnippetDto>) => {
      const hasNextPage =
        lastPage.pagination.page < Math.ceil(lastPage.pagination.total / 5);
      return hasNextPage ? lastPage.pagination.page + 1 : undefined;
    },
  };
};

type UseSnippetsOptions = {
  queryConfig?: Partial<ReturnType<typeof getFeedQueryOptions>>;
};

export const useGetFeed = ({ queryConfig }: UseSnippetsOptions) => {
  return useInfiniteQuery({
    ...getFeedQueryOptions(),
    ...queryConfig,
    initialPageParam: 1,
  });
};
