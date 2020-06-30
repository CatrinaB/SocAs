const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	userType: {
		type: String,
		required: true,
	},
	friends: {
		type: Array,
		required: false,
	},
	pending: {
		type: Array,
		required: false,
	},
	receivedRequests: {
		type: Array,
		required: false,
	},
});

module.exports = mongoose.model("User", userSchema);
