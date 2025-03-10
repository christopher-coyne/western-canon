import { queryOptions, useQuery } from "@tanstack/react-query";
import { ProjectEntity } from "@/types/api/Api";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export const getProjectById = (id: string): Promise<ProjectEntity> => {
  return api.get(`/projects/${id}`).then((response) => response.data.data);
};

export const getProjectByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });
};

type UseProjectByIdOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getProjectByIdQueryOptions>;
};

export const useGetProjectById = ({
  id,
  queryConfig,
}: UseProjectByIdOptions) => {
  return useQuery({
    ...getProjectByIdQueryOptions(id),
    ...queryConfig,
  });
};
