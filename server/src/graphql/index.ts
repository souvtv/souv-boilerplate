import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema } from '@graphql-tools/mock'
import Schema from '@server/graphql/schema'

import { graphqlMocks } from './mock'

const resolvers = mergeResolvers(Schema.map(s => s.resolvers))
export const typeDefs = mergeTypeDefs(Schema.map(s => s.typeDefs))

// Create the base executable schema
let schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})


// Create a new schema with mocks
schema = addMocksToSchema({ mocks: graphqlMocks, preserveResolvers: true, schema })

export default schema
