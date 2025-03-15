import { queryOptions, useQuery } from "@tanstack/react-query";
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
  tags: string[],
  query?: string
): Promise<PaginatedResponse<SnippetDto>> => {
  return api
    .get("/snippets", {
      params: {
        page,
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

export const getSnippetsQueryOptions = (
  {
    page,
    query,
    tags,
  }: {
    page?: number;
    query?: string;
    tags: string[];
  } = { tags: [] }
) => {
  return queryOptions({
    queryKey: ["snippets", { page, query, tags }],
    queryFn: () => getSnippets(page, tags, query),
  });
};

type UseSnippetsOptions = {
  page?: number;
  query?: string;
  tags: string[];
  queryConfig?: QueryConfig<typeof getSnippetsQueryOptions>;
};

export const useGetSnippets = ({
  queryConfig,
  page,
  query,
  tags,
}: UseSnippetsOptions) => {
  return useQuery({
    ...getSnippetsQueryOptions({ page, query, tags }),
    ...queryConfig,
  });
};
