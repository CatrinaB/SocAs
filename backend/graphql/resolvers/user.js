const User = require("../../models/user");
const Asssistant = require("../../models/assistant");
const DisabledPerson = require("../../models/disabled-person");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");
const disabledPerson = require("../../models/disabled-person");
const { ca } = require("date-fns/locale");
const user = require("../../models/user");
const { info } = require("../../utils/logger");

// Todo: Check if it is the right approach
const BCRYPT_SALT = 12;
const SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const TOKEN_EXPIRATION_STRING = "1y"; //Todo: change
const TOKEN_EXPIRATION = 1;

const USER_ALREADY_EXISTS_ERROR = "User already exists";
const USER_NOT_EXISTS_ERROR = "Incorrect email or password";
const WRONG_PASSWORD_ERROR = "Incorrect email or password";
const SERVICE_UNAVAILABLE_CREATE_USER =
	"Service unavailable: unable to create new user";
const SERVICE_UNAVAILABLE_GET_USER =
	"Service unavailable: unable to retrieve user";
const SERVICE_UNAVAILABLE_LOGIN_USER =
	"Service unavailable: unable to login user";

module.exports = {
	createUser: async (args) => {
		const email = args.userInput.email;
		const password = args.userInput.password;
		const userType = args.userInput.userType;
		logger.debug(
			`Attempt of creating user (${userType}) with email ${email}`
		);

		let user;
		try {
			user = await User.findOne({ email: email });
		} catch (err) {
			logger.error(`Error occurred while searching for user: ${err}`);
			throw Error(SERVICE_UNAVAILABLE_CREATE_USER);
		}

		if (user) {
			logger.debug(`User with email ${email} already exists`);
			throw new Error(USER_ALREADY_EXISTS_ERROR);
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);

		const newUser = new User({
			email: email,
			password: hashedPassword,
			userType: userType,
		});

		let result;
		try {
			result = await newUser.save();
		} catch (err) {
			logger.debug(`Error occurred while saving new user: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_CREATE_USER);
		}

		logger.debug(`User save result: ${JSON.stringify(result, null, 2)}`);

		return {
			...result._doc,
		};
	},
	login: async ({ email, password }) => {
		logger.debug(`Attempt of login for user with email ${email}`);

		let loginUser;
		try {
			loginUser = await User.findOne({ email: email });
		} catch (err) {
			logger.error(`Error occurred while searching for user: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_LOGIN_USER);
		}

		if (!loginUser) {
			logger.debug(`User with email ${email} not found`);
			throw new Error(USER_NOT_EXISTS_ERROR);
		}

		const isEqual = await bcrypt.compare(password, loginUser.password);
		if (!isEqual) {
			logger.debug(`Wrong password for user with email ${email}`);
			throw new Error(WRONG_PASSWORD_ERROR);
		}

		logger.debug(`User with email ${email} provided correct password`);

		const token = jwt.sign(
			{
				userId: loginUser.id,
				email: loginUser.email,
			},
			SECRET_KEY,
			{
				expiresIn: TOKEN_EXPIRATION_STRING,
			}
		);

		return {
			userId: loginUser.id,
			token: token,
			tokenExpiration: TOKEN_EXPIRATION,
			userType: loginUser.userType,
		};
	},
	getUser: async (args) => {
		// logger.debug("Attempt to retrieve user details");

		// logger.info(req);

		// if (!req.isAuth) {
		// 	logger.debug("Not authenticated")
		// 	throw new Error("Not authenticated")
		// }

		try {
			return await User.findOne({ _id: args.userId });
		} catch (err) {
			logger.error(`Error occurred while searching for user: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_GET_USER);
		}
	},
	getUserProfile: async ({ uid }) => {
		logger.debug(`Retrieving user with uid=${uid}`);

		let assistantUser;
		try {
			assistantUser = await Asssistant.findOne({ _id: uid });
		} catch (err) {
			logger.warn(`Something went wrong: ${err}`);
		}

		let disabledPerson;
		try {
			disabledPerson = await DisabledPerson.findOne({ _id: uid });
		} catch (err) {
			logger.warn(`Something went wrong: ${err}`);
		}

		return {
			assistant: assistantUser,
			disabledPerson: disabledPerson,
		};
	},

	getUserFriends: async ({ userId }) => {
		logger.debug(`getting friends...`);

		let user;
		try {
			user = await User.findOne({ _id: userId });
			return user._doc.friends;
		} catch (err) {
			logger.warn(`Something went wrong: ${err}`);
			throw new Error();
		}
	},

	getUserPending: async ({ userId }) => {
		logger.debug(`getting pending...`);

		let user;
		try {
			user = await User.findOne({ _id: userId });
			return user._doc.pending;
		} catch (err) {
			logger.warn(`Something went wrong: ${err}`);
			throw new Error();
		}
	},

	searchUsers: async ({ emailLike }) => {
		logger.debug(`Retrieving users with email like ${emailLike}`);

		let allUsers = [];

		try {
			allUsers = await User.find({});
		} catch (err) {
			logger.error(`Something went wrong: ${err}`);
		}

		const searchedUsers = [];

		allUsers.forEach((user) => {
			if (user.email.includes(emailLike)) {
				searchedUsers.push(user);
			}
		});

		return searchedUsers;
	},

	addUserPending: async (args) => {
		logger.debug(`adding pending... ${args.pendingRequest.pendingId}`);

		let user;
		try {
			user = await User.findOne({ _id: args.pendingRequest.userId });
		} catch (err) {
			logger.warn(`Something went wrong while adding pending: ${err}`);
			throw new Error();
		}

		if (!user) {
			logger.debug(
				`user with id ${args.pendingRequest.userId} does not exist`
			);
			throw new Error("user nu");
		}

		let pendingArray = user._doc.pending;
		logger.debug(`pending ${pendingArray}`);

		await pendingArray.push(args.pendingRequest);

		logger.debug(
			`comments after push ${JSON.stringify(pendingArray, null, 2)}`
		);

		// const updatedUser = new User({
		// 	...user._doc,
		// 	pending: JSON.stringify(pending),
		// });

		// let result;
		// try {
		// 	result = await updatedUser.save();
		// } catch (err) {
		// 	logger.error(`Error occured while adding comment to post: ${err}`);
		// 	throw new Error();
		// }

		const result = new Promise((resolve, reject) => {
			User.findOneAndUpdate(
				{ _id: args.pendingRequest.userId },
				{
					$push: {
						pending: {
							pendingId: args.pendingRequest.pendingId,
							pendingName: args.pendingRequest.pendingName,
						},
					},
				},
				{ new: true },
				(err, result) => {
					if (err) reject(err);
					else resolve(result);
				}
			);
		});

		// let result;
		// try {
		// 	result = await User.findOneAndUpdate(
		// 		{ _id: args.userId },
		// 		{ pending: pendingArray },
		// 		{ new: true }
		// 	);
		// } catch (err) {
		// 	console.log(err);
		// }

		// const result = await User.findOneAndUpdate(
		// 	{ _id: args.pendingRequestuserId },
		// 	{
		// 		pending: pendingArray,
		// 	},
		// 	{ new: true }
		// ).exec((err, res) => {
		// 	if (err)
		// 		logger.error(`Error occurred while updating assistant: ${err}`);
		// });

		// return { ...result._doc };

		logger.debug(`Pending added successfully ${result}`);

		return {
			...result._doc,
		};
	},

	getUserReceivedPending: async ({ userId }) => {
		logger.debug(`getting received pending...`);

		let user;
		try {
			user = await User.findOne({ _id: userId });
			return user._doc.receivedRequests;
		} catch (err) {
			logger.warn(`Something went wrong: ${err}`);
			throw new Error();
		}
	},

	addUserReceivedPending: async (args) => {
		logger.debug(
			`adding received pending... ${args.pendingRequest.pendingId}`
		);

		let user;
		try {
			user = await User.findOne({ _id: args.pendingRequest.userId });
		} catch (err) {
			logger.warn(`Something went wrong while adding pending: ${err}`);
			throw new Error();
		}

		if (!user) {
			logger.debug(
				`user with id ${args.pendingRequest.userId} does not exist`
			);
			throw new Error("user nu");
		}

		let receivedPendingArray = user._doc.receivedRequests;
		logger.debug(`pending ${receivedPendingArray}`);

		await receivedPendingArray.push(args.pendingRequest);

		logger.debug(
			`received pending after push ${JSON.stringify(
				receivedPendingArray,
				null,
				2
			)}`
		);

		const result = new Promise((resolve, reject) => {
			User.findOneAndUpdate(
				{ _id: args.pendingRequest.userId },
				{
					$push: {
						receivedRequests: {
							pendingId: args.pendingRequest.pendingId,
							pendingName: args.pendingRequest.pendingName,
						},
					},
				},
				{ new: true },
				(err, result) => {
					if (err) reject(err);
					else resolve(result);
				}
			);
		});

		logger.debug(`Received ending added successfully ${result}`);

		return {
			...result._doc,
		};
	},

	addFriend: async (args) => {
		logger.debug(`adding friend... ${args.friendInput.friendId}`);

		let user;
		try {
			user = await User.findOne({ _id: args.friendInput.userId });
		} catch (err) {
			logger.warn(`Something went wrong while adding pending: ${err}`);
			throw new Error();
		}

		if (!user) {
			logger.debug(
				`user with id ${args.friendInput.userId} does not exist`
			);
			throw new Error("user nu");
		}

		let friendArray = user._doc.receivedRequests;
		logger.debug(`pending ${friendArray}`);

		await friendArray.push(args.friendInput);

		logger.debug(
			`received pending after push ${JSON.stringify(
				friendArray,
				null,
				2
			)}`
		);

		const result = new Promise((resolve, reject) => {
			User.findOneAndUpdate(
				{ _id: args.friendInput.userId },
				{
					$push: {
						friends: {
							friendId: args.friendInput.friendId,
							friendName: args.friendInput.friendName,
						},
					},
				},
				{ new: true },
				(err, result) => {
					if (err) reject(err);
					else resolve(result);
				}
			);
		});

		logger.debug(`Friend added successfully ${result}`);

		return {
			...result._doc,
		};
	},

	removeReceivedPending: async (args) => {
		logger.debug(`removing received pending... ${args.pendingId}`);

		let user;
		try {
			user = await User.findOne({ _id: args.userId });
		} catch (err) {
			logger.warn(
				`Something went wrong while removing received pending: ${err}`
			);
			throw new Error();
		}

		if (!user) {
			logger.debug(`user with id ${args.userId} does not exist`);
			throw new Error("user nu");
		}

		let pendingArray = user._doc.receivedRequests;
		logger.debug(`received pending ${pendingArray}`);

		let index = -1;
		await pendingArray.map((el, i) =>
			el.pendingId === args.pendingId ? (index = i) : ""
		);

		await pendingArray.splice(index, 1);

		logger.debug(
			`pending after splice ${JSON.stringify(pendingArray, null, 2)}`
		);

		const result = new Promise((resolve, reject) => {
			User.findOneAndUpdate(
				{ _id: args.userId },
				{
					$set: {
						receivedRequests: pendingArray,
					},
				},
				{ new: true },
				(err, result) => {
					if (err) reject(err);
					else resolve(result);
				}
			);
		});

		logger.debug(`Received request removed successfully ${result}`);

		return {
			...result._doc,
		};
	},

	removePending: async (args) => {
		logger.debug(`removing received pending... ${args.pendingId}`);

		let user;
		try {
			user = await User.findOne({ _id: args.userId });
		} catch (err) {
			logger.warn(`Something went wrong while removing pending: ${err}`);
			throw new Error();
		}

		if (!user) {
			logger.debug(`user with id ${args.userId} does not exist`);
			throw new Error("user nu");
		}

		let pendingArray = user._doc.pending;
		logger.debug(`pending ${pendingArray}`);

		let index = -1;
		await pendingArray.map((el, i) =>
			el.pendingId === args.pendingId ? (index = i) : ""
		);

		await pendingArray.splice(index, 1);

		logger.debug(
			`pending after splice ${JSON.stringify(pendingArray, null, 2)}`
		);

		const result = new Promise((resolve, reject) => {
			User.findOneAndUpdate(
				{ _id: args.userId },
				{
					$set: {
						pending: pendingArray,
					},
				},
				{ new: true },
				(err, result) => {
					if (err) reject(err);
					else resolve(result);
				}
			);
		});

		logger.debug(`Received request removed successfully ${result}`);

		return {
			...result._doc,
		};
	},
};
