const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");

// Todo: Check if it is the right approach
const BCRYPT_SALT = 12;
const SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const TOKEN_EXPIRATION_STRING = "1y"; //Todo: change
const TOKEN_EXPIRATION = 1;

const USER_ALREADY_EXISTS_ERROR = "User already exists";
const USER_NOT_EXISTS_ERROR = "Incorrect email or password";
const WRONG_PASSWORD_ERROR = "Incorrect email or password";
const SERVICE_UNAVAILABLE_CREATE_USER = "Service unavailable: unable to create new user";
const SERVICE_UNAVAILABLE_LOGIN_USER = "Service unavailable: unable to login user";

module.exports = {
	createUser: async args => {
		const email = args.userInput.email;
		const password = args.userInput.password;
		const userType = args.userInput.userType;
		logger.debug(`Attempt of creating user (${userType}) with email ${email}`);

		let user;
		try {
			user = await User.findOne({ email: email });
		} catch (err) {
			logger.error(`Error occurred while searching for user: ${err}`);
			throw Error(SERVICE_UNAVAILABLE_CREATE_USER);
		}

		if (user) {
			logger.debug(`User with email ${email} already exists`)
			throw new Error(USER_ALREADY_EXISTS_ERROR);
		}

		const hashedPassword = await bcrypt.hash(
			password,
			BCRYPT_SALT
		);

		const newUser = new User({
			email: email,
			password: hashedPassword,
			userType: userType
		});

		let result;
		try {
			result = await newUser.save();
		} catch (err) {
			logger.debug(`Error occurred while saving new user: ${err}`)
			throw new Error(SERVICE_UNAVAILABLE_CREATE_USER);
		}

		logger.debug(`User save result: ${JSON.stringify(result, null, 2)}`);

		return {
			...result._doc
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
				email: loginUser.email
			},
			SECRET_KEY,
			{
				expiresIn: TOKEN_EXPIRATION_STRING
			}
		);

		return {
			userId: loginUser.id,
			token: token,
			tokenExpiration: TOKEN_EXPIRATION,
			userType: loginUser.userType
		};
	}
};
