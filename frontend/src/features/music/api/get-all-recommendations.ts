import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getRecommendations = (
    page = 1,
): Promise<{
    data: any;
    meta: any;
}> => {
    return api.get(`/recommendations`, {
        params: {
            page,
        },
    });
};

export const getRecommendationsQueryOptions = ({
    page,
}: { page?: number } = {}) => {
    return queryOptions({
        queryKey: page ? ['recommendations', { page }] : ['recommendations'],
        queryFn: () => getRecommendations(page),
    });
};

type UseDiscussionsOptions = {
    page?: number;
    queryConfig?: QueryConfig<typeof getRecommendationsQueryOptions>;
};

export const useGetRecommendations = ({
    queryConfig,
    page,
}: UseDiscussionsOptions) => {
    return useQuery({
        ...getRecommendationsQueryOptions({ page }),
        ...queryConfig,
    });
};