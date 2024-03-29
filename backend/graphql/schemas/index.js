const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String!
		userType: String!
		friends: [Friend]
		pending: [PendingRequest]
		receivedRequests: [PendingRequest]
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
        experience: Boolean
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
		comments: [Comment],
		likes: Int
	}

	input NewPostInput {
		authorID: String!
		authorName: String!
		text: String!
		timePosted: String!
	}

	type Comment {
		_id: ID!
		authorID: String!
		authorName: String!
		text: String!
		timeCommented: String!
	}

	input NewCommentInput {
		postID: String!
		authorID: String!
		authorName: String!
		text: String!
		timeCommented: String!
	}

	type PendingRequest{
		pendingId: String!,
		pendingName: String!
	}
	
	input PendingRequestInput{
		userId: String!,
		pendingId: String!,
		pendingName: String!
	}

	type Friend{
		friendId: String!,
		friendName: String!
	}
	
	input FriendInput{
		userId: String!,
		friendId: String!,
		friendName: String!
	}

    type RootQuery {
        login(email: String!, password: String!): AuthData
		getAssistant(userId: String!): Assistant
		getDisabled(userId: String!): DisabledPerson
		getUser(userId: String!): User
		getUserFriends(userId: String!): [Friend]
		getUserPending(userId: String!): [PendingRequest]
		getUserReceivedPending(userId: String!): [PendingRequest]
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
		createComment(newCommentInput: NewCommentInput): Comment
		addUserPending(pendingRequest: PendingRequestInput!): User
		addUserReceivedPending(pendingRequest: PendingRequestInput!): User
		addFriend(friendInput: FriendInput!): User
		removePending(userId: String!, pendingId: String!): User
		removeReceivedPending(userId: String!, pendingId: String!): User
	}
	
	type RootSubscription {
		checkComments(postID: String!): Comment
	}

    schema {
        query: RootQuery
		mutation: RootMutation
		subscription: RootSubscription
    }
`);
