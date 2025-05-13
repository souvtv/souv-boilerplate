import { gql } from 'graphql-tag'


const typeDefs = gql`

  "Used for pagination"
  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  "An object with a Globally Unique ID"
  interface Node {
    "The ID of the object."
    id: ID!
  }
`



const resolvers = {
  //
}

export default {
  resolvers,
  typeDefs,
}
