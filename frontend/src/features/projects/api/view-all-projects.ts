import { queryOptions, useQuery } from "@tanstack/react-query";
import { ProjectEntity } from "@/types/api/Api";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

/*
export const getProjects = (
  page = 1
): Promise<{ data: { data: ProjectEntity[]; isSuccess: boolean } }> => {
  return api.get(`/projects`, {
    params: {
      page,
    },
  });
};
*/

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
  page = 1
): Promise<PaginatedResponse<ProjectEntity>> => {
  return api.get("/projects", { params: { page } }).then((response) => ({
    items: response.data.data,
    isSuccess: response.data.isSuccess,
    pagination: response.data.pagination,
  }));
};

export const getProjectsQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ["projects", { page }] : ["projects"],
    queryFn: () => getProjects(page),
  });
};

type UseProjectsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getProjectsQueryOptions>;
};

export const useGetProjects = ({ queryConfig, page }: UseProjectsOptions) => {
  return useQuery({
    ...getProjectsQueryOptions({ page }),
    ...queryConfig,
  });
};
