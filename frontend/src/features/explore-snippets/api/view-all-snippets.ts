import { queryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { SnippetDto } from "@/types/api/Api";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

type PaginatedResponse<T> = {
  items: T[];
  isSuccess: boolean;
  pagination: {
    total: number;
    page: number;
    // ... other pagination fields
  };
};

export const getSnippets = (
  page = 1,
  pageSize = 5,
  tags: string[],
  query?: string
): Promise<PaginatedResponse<SnippetDto>> => {
  return api
    .get("/snippets", {
      params: {
        page,
        pageSize,
        query,
        tags: tags.join(""),
      },
    })
    .then((response) => ({
      items: response.data.data,
      isSuccess: response.data.isSuccess,
      pagination: response.data.pagination,
    }));
};

type SnippetsQueryKey = ["snippets", { query?: string; tags: string[] }];

export const getSnippetsQueryOptions = (
  {
    query,
    tags,
  }: {
    query?: string;
    tags: string[];
  } = { tags: [] }
) => {
  return {
    queryKey: ["snippets", { query, tags }] as const,
    queryFn: ({ pageParam = 1 }) => getSnippets(pageParam, 5, tags, query),
    getNextPageParam: (lastPage: PaginatedResponse<SnippetDto>) => {
      const hasNextPage =
        lastPage.pagination.page < Math.ceil(lastPage.pagination.total / 5);
      return hasNextPage ? lastPage.pagination.page + 1 : undefined;
    },
  };
};

type UseSnippetsOptions = {
  query?: string;
  tags: string[];
  queryConfig?: Partial<ReturnType<typeof getSnippetsQueryOptions>>;
};

export const useGetSnippets = ({
  queryConfig,
  query,
  tags,
}: UseSnippetsOptions) => {
  return useInfiniteQuery({
    ...getSnippetsQueryOptions({ query, tags }),
    ...queryConfig,
  });
};
