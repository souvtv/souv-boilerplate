import schema from '.schema.graphql.json'
import { Client, fetchExchange, Provider } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache';
import { retryExchange } from '@urql/exchange-retry'
import { requestPolicyExchange } from '@urql/exchange-request-policy'
import { devtoolsExchange } from '@urql/devtools'
import type { ObjectFetcher } from 'graphql-ts-client-api';


export const UrqlProvider = Provider
export const gqlClient = new Client({
    url: '/api/graphql',
    exchanges: [
        devtoolsExchange,
        requestPolicyExchange({
            // An optional function that allows you to specify whether an operation should be upgraded.
            shouldUpgrade: operation => operation?.context?.requestPolicy !== 'cache-only',
            // The amount of time in ms that has to go by before upgrading
            ttl: 5 * 60 * 1000, // 5min default
        }),
        cacheExchange({
            schema
        }),
        retryExchange({
            initialDelayMs: 1000,
            maxDelayMs: 15000,
            maxNumberAttempts: 5,
            randomDelay: true,
            retryIf: (error, _operation) =>
                !!error && (!!error.networkError || !!error.graphQLErrors?.some(e => e.extensions.code === 'error_unauthorized')),
        }),
        fetchExchange],
    fetchOptions: () => {
        // TODO AUTH TOKEN
        // const token = getToken();
        return {
            //   headers: { authorization: token ? `Bearer ${token}` : '' },
        }
    },
})

export const fetcherToString = <T extends 'Query' | 'Mutation' | 'Subscription'>(fetcher: ObjectFetcher<T, object, object>) => {
  const varArr: string[] = []
  for (const [name, type] of fetcher.variableTypeMap) {
    varArr.push(`$${name}: ${type}`)
  }

  const map = fetcher?.fieldMap?.keys() || new Map<string, string>().keys()
  const keys: string[] = []
  for (const key of map) {
    keys.push(key)
  }

  const queryName = keys.join('_')

  const query = `${fetcher.fetchableType?.name?.toLowerCase()} ${queryName}${
    varArr.length > 0 ? `(${varArr.join(', ')})` : ''
  }${fetcher.toString()}`

  return query
}