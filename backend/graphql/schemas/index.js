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
        experience: String
        experienceTime: String
		experienceType: [String]
		disabilityExp: [String]
        allottedTime: Int
        helpType: [String]
        reason: String
    }

    type DisabledPerson {
        _id: ID!
        name: String!
        gender: String
        employmentStatus: String
        dob: String
        disabilities: [String]
        gravity: String
        neededTime: Int
        experienceWithStrangers: Boolean
        stateAid: Boolean
        helpType: String
        reason: String
    }

    type UserProfile {
        assistant: Assistant
        disabledPerson: DisabledPerson
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
        experience: String
        allottedTime: Int
    }

    input ExistingAssistantInput {
        _id: ID!
        gender: String
        employmentStatus: String
        dob: String
        experience: String
        experienceTime: Int
		experienceType: [String]
		disabilityExp: [String]
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
        name: String
        gender: String
        employmentStatus: String
        dob: String
        disabilities: [String]
        gravity: String
        neededTime: Int
        experienceWithStrangers: Boolean
        stateAid: Boolean
        helpType: String
        reason: String
	}

	type Post {
		_id: ID!
		authorID: String!
		authorName: String!
		text: String!
		timePosted: String!
	}

	input NewPostInput {
		authorID: String!
		authorName: String!
		text: String!
		timePosted: String!
	}

    type RootQuery {
        login(email: String!, password: String!): AuthData
		getAssistant: Assistant
		getDisabled: DisabledPerson
		getUser: User
		getAllPosts: [Post]
        getPostsByAuthor(authorID: String!): [Post]
        getUserProfile(uid: String!): UserProfile
        searchUsers(emailLike: String!): [User]
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createAssistant(newAssistantInput: NewAssistantInput): Assistant
        updateAssistant(existingAssistantInput: ExistingAssistantInput): Assistant
        createPerson(newDisabledPersonInput: NewDisabledPersonInput): DisabledPerson
		updatePerson(existingDisabledPersonInput: ExistingDisabledPersonInput): DisabledPerson
		createPost(newPostInput: NewPostInput): Post
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
