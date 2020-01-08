const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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
				name: args.userInput.name,
				surname: args.userInput.surname
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

			return true;
		} catch (error) {
			throw error;
		}
	}
};
