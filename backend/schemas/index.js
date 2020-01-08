const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String!
        name: String!
        surname: String!
    }

    input UserInput {
        email: String!,
        password: String!
        name: String!
        surname: String!
    }

    type RootQuery {
        login(email: String!, password: String!): Boolean!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
