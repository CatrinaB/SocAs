const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const disabledPersonSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: false,
	},
	employmentStatus: {
		type: String,
		required: false,
	},
	dob: {
		type: String,
		required: false,
	},
	disabilities: {
		type: [String],
		required: false,
	},
	gravity: {
		type: String,
		required: false,
	},
	neededTime: {
		type: Number,
		required: false,
	},
	experienceWithStrangers: {
		type: Boolean,
		required: false,
	},
	stateAid: {
		type: Boolean,
		required: false,
	},
	helpType: {
		type: String,
		required: false,
	},
	reason: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model("DisabledPerson", disabledPersonSchema);
