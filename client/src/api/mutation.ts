import type { ObjectFetcher } from 'graphql-ts-client-api'
import { useCallback, useMemo, useRef } from 'react'
import { CombinedError, useMutation as useM } from 'urql'
import { fetcherToString } from '.'

export const useMutation = <T extends object, TVariables extends object>(
    fetcher: ObjectFetcher<'Mutation', T, TVariables>,
    options?: {
        readonly onSuccess?: (data: gqlType<typeof fetcher>) => void
        readonly onError?: (error: CombinedError) => void
    },
) => {
    const opts = useRef(options)

    const [res, _mutate] = useM<ModelType<typeof fetcher>, TVariables>(fetcherToString(fetcher))

    const data = res.data
    const error = res.error
    const loading = res.fetching
    const stale = res.stale

    const mutate = useCallback(
        async (variables?: TVariables) => {
            const res = await _mutate((variables || {}) as TVariables)

            if (res.error) {
                opts?.current?.onError?.(res.error)
            } else if (res.data) {
                opts?.current?.onSuccess?.(res.data)
            }

            return res.data
        },
        [_mutate],
    )

    return useMemo(() => ({ data, error, loading, stale, mutate }), [data, error, loading, stale, mutate])
}