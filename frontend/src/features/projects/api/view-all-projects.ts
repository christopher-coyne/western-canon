import { queryOptions, useQuery } from "@tanstack/react-query";
import { ProjectEntity } from "@/types/api/Api";

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

export const getProjects = (
  page = 1,
  difficulties: string[],
  tags: string[],
  query?: string
): Promise<PaginatedResponse<ProjectEntity>> => {
  return api
    .get("/projects", {
      params: {
        page,
        query,
        difficulties: difficulties.join(""),
        tags: tags.join(""),
      },
    })
    .then((response) => ({
      items: response.data.data,
      isSuccess: response.data.isSuccess,
      pagination: response.data.pagination,
    }));
};

export const getProjectsQueryOptions = (
  {
    page,
    query,
    tags,
    difficulties,
  }: {
    page?: number;
    query?: string;
    tags: string[];
    difficulties: string[];
  } = { tags: [], difficulties: [] }
) => {
  return queryOptions({
    queryKey: ["projects", { page, query, difficulties, tags }],
    queryFn: () => getProjects(page, difficulties, tags, query),
  });
};

type UseProjectsOptions = {
  page?: number;
  query?: string;
  difficulties: string[];
  tags: string[];
  queryConfig?: QueryConfig<typeof getProjectsQueryOptions>;
};

export const useGetProjects = ({
  queryConfig,
  page,
  query,
  tags,
  difficulties,
}: UseProjectsOptions) => {
  return useQuery({
    ...getProjectsQueryOptions({ page, query, tags, difficulties }),
    ...queryConfig,
  });
};
