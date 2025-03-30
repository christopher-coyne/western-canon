import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { SnippetDto } from "@/types/api/Api";

export const getFeed = (cursor: number): Promise<SnippetDto> => {
  return api
    .get(`/feed?cursor=${cursor}`)
    .then((response) => response.data.data);
};

export const getFeedQueryOptions = (cursor: number) => {
  return queryOptions({
    queryKey: ["feed", cursor],
    queryFn: () => getFeed(cursor),
  });
};

type UseFeedOptions = {
  cursor: number;
  queryConfig?: QueryConfig<typeof getFeedQueryOptions>;
};

export const useGetProjectById = ({ cursor, queryConfig }: UseFeedOptions) => {
  return useQuery({
    ...getFeedQueryOptions(cursor),
    ...queryConfig,
  });
};
