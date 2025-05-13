import { gql } from 'graphql-tag'

const typeDefs = gql`
    input HelloCreateContent {
        title: String!
        description: String
    }

    input HelloUpdateContent {
        title: String
        description: String
    }

    """ Hello world """
    type Hello implements Node {
        id: ID!

        createdAt: String!
        createdBy: String

        title: String!
        description: String
    }

    type Query {
        hello(id:ID!):Hello
        hellos:[Hello!]!
    }

    type Mutation{
        helloCreate(content:HelloCreateContent!): Hello
        helloUpdate(id:ID!, content:HelloUpdateContent! ): Hello
    }
`

const resolvers:gqlResolver = {
    Query: {
        hello: (_p, _args, _ctx, _info) => {
            //
        },
        hellos: (_p, _args, _ctx, _info) => {
            //
        }
    },
    Mutation: {
        //
    }
}

export default {
    resolvers,
    typeDefs,
}