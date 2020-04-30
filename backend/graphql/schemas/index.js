const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String!
        userType: String!
    }

    type Assistant {
        _id: ID!
        name: String
        gender: String
        employmentStatus: String
        dob: String
        experience: Boolean
        experienceTime: Int
        experienceType: [String]
        allottedTime: Int
        helpType: [String]
        reason: String
    }

    type DisabledPerson {
        _id: ID!
        name: String!
        surname: String
        gender: String
        employmentStatus: String
        age: Int
        disabilities: [String]
        gravity: String
        neededTime: Int
        experienceWithStrangers: Boolean
        stateAid: Boolean
        helpType: String
        reason: String
    }

    type AuthData {
        userId: ID!,
        token: String!,
        tokenExpiration: Int!,
        userType: String!
    }

    input UserInput {
        email: String!,
        password: String!
        userType: String!
    }

    input NewAssistantInput {
        _id: ID!
        name: String!
        surname: String
        age: Int
        experience: Int
        allottedTime: Int
    }

    input ExistingAssistantInput {
        _id: ID!
        gender: String
        employmentStatus: String
        dob: String
        experience: Boolean
        experienceTime: Int
        experienceType: [String]
        allottedTime: Int
        helpType: [String]
        reason: String
    }

    input NewDisabledPersonInput {
        _id: ID!
        name: String!
    }

    input ExistingDisabledPersonInput {
        _id: ID!
        surname: String
        gender: String
        employmentStatus: String
        age: Int
        disabilities: [String]
        gravity: String
        neededTime: Int
        experienceWithStrangers: Boolean
        stateAid: Boolean
        helpType: String
        reason: String
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createAssistant(newAssistantInput: NewAssistantInput): Assistant
        updateAssistant(existingAssistantInput: ExistingAssistantInput): Assistant
        createPerson(newDisabledPersonInput: NewDisabledPersonInput): DisabledPerson
        updatePerson(existingDisabledPersonInput: ExistingDisabledPersonInput): DisabledPerson
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
