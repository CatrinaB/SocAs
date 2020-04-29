const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger")

// Todo: Check if it is the right approach
const BCRYPT_SALT = 12;
const SECRET_KEY = "tokenkey";
const TOKEN_EXPIRATION_STRING = "1h";
const TOKEN_EXPIRATION = 1;

module.exports = {
	createUser: async args => {
		const email = args.userInput.email;
		const password = args.userInput.password;
		const userType = args.userInput.userType;
		logger.debug(`Attempt of creating user (${userType}) with email ${email}`);

		const user = await User.findOne({ email: email });
		if (user) {
			logger.debug(`User with email ${email} already exists`)
			throw new Error("User already exists!");
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
		const result = await newUser.save();

		logger.debug(`User save result: ${JSON.stringify(result, null, 2)}`);

		return {
			...result._doc
		};
	},
	login: async ({ email, password }) => {
		logger.debug(`Attempt of login for user with email ${email}`);
		const loginUser = await User.findOne({ email: email });
		if (!loginUser) {
			logger.debug(`User with email ${email} not found`);
			throw new Error("User does not exist!");
		}

		const isEqual = await bcrypt.compare(password, loginUser.password);
		if (!isEqual) {
			logger.debug(`Wrong password for user with email ${email}`);
			throw new Error("Wrong password!");
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
