import { graphql } from 'graphql'

import type { GraphQLSchema } from 'graphql/type/schema'

let schema: GraphQLSchema | undefined

export const gqlHandler = async (ctx: unknown, gqlRequest: GraphQLRequest, _schema?: GraphQLSchema) => {
  
  // Load schema
  if (_schema) {
    schema = _schema
  } else if (!schema) {
    schema = (await import('@server/graphql')).default
  }
  //

  const result = await graphql({
    contextValue: ctx,
    operationName: gqlRequest.operationName,
    schema,
    source: gqlRequest.query || 'query ping { ping }',
    variableValues: gqlRequest.variables,
  })

  //

  return result
}
