import { useMemo } from "react"
import { useQuery as useQ, type OperationContext, type RequestPolicy } from "urql"
import type { ObjectFetcher } from 'graphql-ts-client-api'
import { fetcherToString } from "."

export const useQuery = <T extends object, TVariables extends object>(
    fetcher: ObjectFetcher<'Query', T, TVariables>,
    params: {
        pause?: boolean
        requestPolicy?: RequestPolicy
        debounce?: number
        variables?: TVariables
        context?: Partial<OperationContext>
    } = {},
) => {
    
    const [res, refetch] = useQ<ModelType<typeof fetcher>>({
        ...params,
        variables: params.variables,
        query: fetcherToString(fetcher)
    })

    const data = res.data
    const error = res.error
    const loading = res.fetching
    const stale = res.stale

    return useMemo(() => ({ data, error, loading, stale, refetch }), [data, error, loading, stale, refetch])
}
