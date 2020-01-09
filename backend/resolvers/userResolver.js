const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
	createUser: async args => {
		try {
			const user = await User.findOne({
				email: args.userInput.email
			});
			if (user) {
				throw new Error("User already exists!");
			}
			const hashedPassword = await bcrypt.hash(
				args.userInput.password,
				12
			);

			const newUser = new User({
				email: args.userInput.email,
				password: hashedPassword,
				userType: args.userInput.userType
			});
			const result = await newUser.save();

			return {
				...result._doc
			};
		} catch (error) {
			throw error;
		}
	},
	login: async ({ email, password }) => {
		try {
			const loginUser = await User.findOne({ email: email });
			console.log(loginUser);
			if (!loginUser) {
				throw new Error("User does not exist!");
			}

			const isEqual = await bcrypt.compare(password, loginUser.password);
			if (!isEqual) {
				throw new Error("Wrong password!");
			}

			const token = jwt.sign(
				{
					userId: loginUser.id,
					email: loginUser.email
				},
				"tokenkey",
				{
					expiresIn: "1h"
				}
			);
			return {
				userId: loginUser.id,
				token: token,
				tokenExpiration: 1,
				userType: loginUser.userType
			};
		} catch (error) {
			throw error;
		}
	}
};
