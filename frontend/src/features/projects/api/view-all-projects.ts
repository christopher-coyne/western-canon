import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export const getProjects = (
  page = 1
): Promise<{
  data: any;
  meta: any;
}> => {
  return api.get(`/projects`, {
    params: {
      page,
    },
  });
};

export const getProjectsQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ["projects", { page }] : ["projects"],
    queryFn: () => getProjects(page),
  });
};

type UseDiscussionsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getProjectsQueryOptions>;
};

export const useGetRecommendations = ({
  queryConfig,
  page,
}: UseDiscussionsOptions) => {
  return useQuery({
    ...getProjectsQueryOptions({ page }),
    ...queryConfig,
  });
};
